"use client"

import { dataProducts } from '@/data/data';
import { useActiveContext } from '@/hooks/useActiveContext';
import Image from 'next/image'
import React, { useEffect, useMemo, useRef } from 'react'
import ModalConfirmationCartItem from './ModalConfirmationCartItem';
import clsx from 'clsx';

const ModalConfirmation = () => {
    const { dataCartCollection, setDataCartCollection, isOpen, setIsOpen } = useActiveContext();

    const containerRef = useRef<HTMLDivElement>(null);

    const dataCarts = useMemo(() => {
        return Object.values(dataCartCollection).map((value) => {
            let tempData = dataProducts.filter((product) => product.id == value.id)[0]
            return { ...value, title: tempData?.title || "", price: tempData?.price || 0, thumbnail_path: tempData?.thumbnail_path || "" }
        });
    }, [isOpen]);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current && containerRef.current === event.target)
            setDataCartCollection({});
    };

    useEffect(() => {
        if (Object.keys(dataCartCollection).length === 0) {
            setIsOpen(false);
        }
    }, [dataCartCollection])

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    return (
        <div onClick={handleClick} ref={containerRef} className={clsx("w-full h-full fixed bg-black bg-opacity-50 top-0 left-0 flex items-center justify-center font-redhat text-xs transition", isOpen ? "z-50 opacity-100" : "-z-10 opacity-0")}>
            <div className="w-[22rem] bg-white rounded-lg flex flex-col p-6 gap-4 sm:w-96 lg:w-[30rem]">
                <Image
                    src="/images/icon-order-confirmed.svg"
                    width={1920}
                    height={1080}
                    alt="Order Confirmed"
                    priority
                    className="w-8 h-auto sm:w-10"
                />
                <div>
                    <h2 className="font-bold text-black text-[1.5rem] mb-2 sm:text-[1.8rem]">Order Confirmed</h2>
                    <p className="text-gray-400 sm:text-base">We hope you enjoy your food!</p>
                </div>
                <div className="flex flex-col py-4 gap-2 bg-[#FBF8F6] rounded-lg">
                    <div className="flex px-4 flex-col gap-2 overflow-y-scroll max-h-36 sm:max-h-52 lg:max-h-60">
                        {dataCarts.map((value, index) => (<ModalConfirmationCartItem data={value} key={"ModalConfirmationCartItem_" + index} />))}
                    </div>
                    <div className="flex px-4 justify-between items-center mt-1">
                        <p className="text-gray-400 sm:text-base">Order Total</p>
                        <h2 className="font-bold text-lg sm:text-xl">${dataCarts.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0) || 0}</h2>
                    </div>
                </div>
                <button className="py-2 bg-orange-700 text-xs text-white rounded-full sm:text-base"
                    onClick={() => {
                        setDataCartCollection({})
                    }}
                >Start New Order</button>
            </div>
        </div>
    )
}

export default ModalConfirmation