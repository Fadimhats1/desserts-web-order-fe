import { TDataCart } from '@/data/type';
import Image from 'next/image'
import React from 'react'

interface ModalConfirmationCartItemProps {
    data: Omit<TDataCart, "isSelected"> & {
        title: string;
        price: number;
        thumbnail_path: string;
    };
}

const ModalConfirmationCartItem: React.FC<ModalConfirmationCartItemProps> = ({ data }) => {
    return (
        <div>
            <div className="flex justify-between items-center sm:text-[17px]">
                <div className="flex gap-2 flex-1 mb-3 mt-1">
                    <Image
                        src={ data.thumbnail_path }
                        width={1920}
                        height={1080}
                        alt={ data.title }
                        priority
                        className="rounded-sm w-9 h-auto sm:w-14"
                    />
                    <div className="flex flex-col justify-center sm:gap-2">
                        <p className="font-semibold pe-2">{ data.title }</p>
                        <div className="flex gap-2">
                            <p className="text-orange-700">{ data.quantity }x</p>
                            <p className="text-gray-400">@ ${ data.price }</p>
                        </div>
                    </div>
                </div>
                <p className="text-gray-600">${ data.price * data.quantity }</p>
            </div>
            <hr />
        </div>
    )
}

export default ModalConfirmationCartItem