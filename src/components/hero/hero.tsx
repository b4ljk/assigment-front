import Image from "next/image";
import Link from "next/link";
import { CarouselComponent } from "./carousel";

export default function Hero() {
  return (
    <section className="w-full">
      <div className="w-full py-12 container flex flex-col lg:flex-row">
        <div className="flex-[1.25]">
          <p className="uppercase font-mono text-7xl font-black">buy now</p>
          <p className="uppercase font-mono text-7xl font-black text-primary">pay later</p>
          <p className="mt-14">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin gravida rutrum gravida. Praesent lacus eros,
            eleifend vitae eros at, fringilla convallis nibh. Sed ut lobortis diam.
          </p>
        </div>
        <div className="flex-1 justify-center flex mt-12 lg:mt-0">
          <CarouselComponent />
        </div>
      </div>
    </section>
  );
}
