"use client"

import { dataProducts } from '@/data/data'
import { useActiveContext } from '@/hooks/useActiveContext'
import Image from 'next/image'
import { useMemo } from 'react'
import CartItem from './CartItem'

const CartCard = () => {
    const { dataCartCollection, setDataCartCollection, setIsOpen } = useActiveContext();

    const dataCarts = useMemo(() => {
        return Object.values(dataCartCollection).map((value) => {
            let tempData = dataProducts.filter((product) => product.id == value.id)[0]
            return { ...value, title: tempData?.title || "", price: tempData?.price || 0 }
        });
    }, [dataCartCollection]);

    return (
        <div className="rounded-lg font-redhat text-black bg-white p-8 flex flex-col gap-6">
            <h2 className="font-bold text-orange-700 text-[1.5rem]">Your Cart ({dataCarts.length})</h2>

            {dataCarts.length == 0 ? <div className="flex flex-col items-center gap-2">
                <Image
                    src="/images/illustration-empty-cart.svg"
                    width={1920}
                    height={1080}
                    alt="Cart Empty"
                    priority
                    className="w-36 h-auto"
                />
                <h4 className="font-semibold text-center text-[#85736F]">Your added items will appear here</h4>

            </div> : <>
                {Object.values(dataCarts).map((value, index) => (<CartItem data={value} key={"CartItem_" + index} setDataCartCollection={setDataCartCollection} />))}

                <div className="flex justify-between items-center">
                    <p className="text-gray-400">Order Total</p>
                    <h2 className="font-bold text-[1.5rem]">${dataCarts.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0) || 0}</h2>
                </div>
                <div className="flex py-4 px-2 gap-2 justify-center items-center bg-[#FBF8F6] rounded-lg">
                    <Image
                        src="/images/icon-carbon-neutral.svg"
                        width={1920}
                        height={1080}
                        alt="Carbon Neutral"
                        priority
                        className="w-6 h-auto"
                    />
                    <p>This is a <b>carbon-neutral</b> delivery</p>
                </div>
                <button className="py-3 bg-orange-700 text-lg text-white rounded-full"
                    onClick={() => {
                        if (dataCarts.length) {
                            setIsOpen(true);
                        }
                    }}>Confirm Order</button>
            </>}
        </div>
    )
}

export default CartCard