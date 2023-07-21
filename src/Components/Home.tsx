import { useQuery } from "@tanstack/react-query";
import Header from "./Header";
import axios from "axios";
import shoes from "../assets/shoes.jpg";
import clothes from "../assets/clothes.jpg";

type elem = {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
};

const Home = () => {
  // Queries
  const { isLoading, isError, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  async function getProducts() {
    const res = await axios.get("https://fakestoreapi.com/products");
    const data = await res.data;
    return data;
  }
  return (
    <main>
      <Header />
      {/* carousel */}
      <div className="p-4">
        <div className="carousel w-full h-[30rem] rounded-md">
          <div id="slide1" className="carousel-item relative w-full">
            <img src={clothes} className="w-full" width={300} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide2" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide2" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
          <div id="slide2" className="carousel-item relative w-full">
            <img src={shoes} className="w-full" width={300} />
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a href="#slide1" className="btn btn-circle">
                ❮
              </a>
              <a href="#slide1" className="btn btn-circle">
                ❯
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* products */}
      <p className="text-4xl md:text-6xl underline font-bold w-full text-center mb-4">Our Products</p>
      <section className="flex flex-wrap justify-around p-4 gap-4">
        {isLoading ? (
          <p>Loading</p>
        ) : isError ? (
          <p>{JSON.stringify(isError)}</p>
        ) : (
          data.map((elem: elem, index: number) => {
            return (
              <div key={index} className="card w-80 bg-base-100 shadow-xl">
                <figure className="p-2">
                  <img src={elem.image} alt="products" width={150} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{elem.title}</h2>
                  <p className="font-bold">${elem.price}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
};

export default Home;
