import CartCard from "@/components/CartCard";
import ModalConfirmation from "@/components/ModalConfirmation";
import ProductCard from "@/components/ProductCard";
import { dataProducts } from "@/data/data";

export default function Home() {
  return (
    <>
      <main className="p-8 flex flex-col items-center bg-[#FDF8F6] md:p-12 lg:p-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <h1 className="font-redhat font-bold text-[2rem] mb-6">Desserts</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {dataProducts.map((value, index) => (
                <ProductCard data={value} key={"ProductCard_" + index} />
              ))}
            </div>
          </div>
          <div>
            <CartCard />
          </div>
        </div>
      </main>
      <ModalConfirmation />
    </>
  );
}
