import { TCartCollection, TDataCart } from '@/data/type';
import Image from 'next/image'
import React from 'react'

interface CartItemProps {
    data: Omit<TDataCart, "isSelected"> & {
        title: string;
        price: number;
    };
    setDataCartCollection: React.Dispatch<React.SetStateAction<TCartCollection>>
}

const CartItem: React.FC<CartItemProps> = ({data, setDataCartCollection}) => {
    
    return (
        <div className="font-redhat">
            <div className="flex items-center">
                <div className="flex-1 flex flex-col gap-2 mb-6">
                    <h5>{data.title}</h5>
                    <div className="flex items-center justify-start gap-2">
                        <p className="text-orange-700">{data.quantity}x</p>
                        <p className="text-gray-400">@ ${data.price}</p>
                        <p className="text-gray-600">${data.price * data.quantity}</p>
                    </div>
                </div>
                <button className="border border-[#CAAFA7] rounded-full p-[0.15rem]"
                onClick={()=> {
                    setDataCartCollection((prevValue) => {
                        const {[data.id]: _, ...rest} = {...prevValue}
                        return rest;
                    })
                }}>
                    <Image
                        src="/images/icon-remove-item.svg"
                        width={1920}
                        height={1080}
                        alt="Remove Item"
                        priority
                        className="w-[10px] h-auto"
                    />
                </button>
            </div>
            <hr />
        </div>
    )
}

export default CartItem