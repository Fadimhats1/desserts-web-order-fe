"use client"

import { ImageTypeFor } from '@/data/enum';
import { DataProductsType } from '@/data/type';
import { useActiveContext } from '@/hooks/useActiveContext';
import { getImageBasedOnType } from '@/utils/utils';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ProductCardProps {
    data: DataProductsType;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
    const {dataCartCollection, setDataCartCollection} = useActiveContext();
    const [typeImage, setTypeImage] = useState<ImageTypeFor>(ImageTypeFor.mobile);

    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 375 && window.innerWidth < 768)
                setTypeImage(ImageTypeFor.mobile)
            else if (window.innerWidth >= 768 && window.innerWidth < 1024)
                setTypeImage(ImageTypeFor.tablet)
            else if(window.innerWidth >= 1024)
                setTypeImage(ImageTypeFor.desktop)
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div className="font-redhat text-black">
            <div className="relative">
                <Image
                    src={getImageBasedOnType(typeImage, data)}
                    width={1920}
                    height={1080}
                    className={clsx("rounded-lg w-full h-auto border-2 max-w-[calc(100%-2px)]", dataCartCollection[data.id]?.isSelected ? "border-orange-700" : "border-transparent")}
                    priority
                    alt={data.title}
                />
                {!dataCartCollection[data.id]?.isSelected ? <button className="rounded-full w-max px-6 py-2 bg-white border border-gray-400 absolute flex gap-3 items-center -bottom-1/5 -translate-y-1/2 left-1/2 -translate-x-1/2 lg:px-4 xl:px-6"
                    onClick={() => {
                        setDataCartCollection((prevValue) => {
                            let tempData = {...prevValue}
                            tempData[data.id] = { isSelected: true, id: data.id, quantity: 1 }
                            return tempData
                        })
                    }}
                >
                    <Image
                        src="/images/icon-add-to-cart.svg"
                        width={1920}
                        height={1080}
                        alt={data.title}
                        priority
                        className="w-5 h-auto"
                    />
                    <h4 className="text-base text-nowrap font-semibold lg:text-sm xl:text-base">Add to Cart</h4>
                </button> : <div className="rounded-full px-3 py-2 text-white bg-orange-700 border border-gray-400 absolute flex gap-10 items-center -bottom-1/5 -translate-y-1/2 left-1/2 -translate-x-1/2"
                >
                    <button className="rounded-full border-[1px] border-white px-1 py-[0.45rem] sm:w-5 sm:py-[0.5rem]"
                        onClick={() => {
                            setDataCartCollection((prevValue) => {
                                let tempData = {...prevValue};
                                if(tempData[data.id].quantity == 1){
                                    const {[data.id]: _, ...rest} = tempData
                                    return rest
                                }

                                tempData[data.id] = { ...tempData[data.id], quantity: tempData[data.id].quantity - 1 }
                                return tempData
                            })
                        }}
                    >
                        <Image
                            src="/images/icon-decrement-quantity.svg"
                            width={1920}
                            height={1080}
                            alt="Decrement"
                            priority
                            className="w-2 h-auto sm:w-8"
                        />
                    </button>
                    <h4 className="text-sm font-semibold sm:text-base">{dataCartCollection[data.id]?.quantity}</h4>
                    <button className="rounded-full border-[1px] border-white p-1 sm:w-5"
                        onClick={() => {
                            setDataCartCollection((prevValue) => {
                                let tempData = {...prevValue};
                                tempData[data.id] = { ...tempData[data.id], quantity: tempData[data.id].quantity + 1 }
                                return tempData
                            })
                        }}
                    >
                        <Image
                            src="/images/icon-increment-quantity.svg"
                            width={1920}
                            height={1080}
                            alt="Increment"
                            priority
                            className="w-2 h-auto sm:w-8"
                        />
                    </button>
                </div>}
            </div>
            <p className="mt-8 text-gray-400">{data.category}</p>
            <h3 className="font-semibold text-lg">{data.title}</h3>
            <h3 className="font-semibold text-orange-700 text-lg font">${data.price}</h3>
        </div>
    )
}

export default ProductCard