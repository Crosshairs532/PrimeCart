import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type TProduct = {
  id: String;
  name: string;
  price: number;
  description: String;
  images: String[];
};
const ProductCard = ({ id, name, price, description, images }: TProduct) => {
  console.log(images[0]);
  return (
    <Card
      key={id as string}
      isPressable
      shadow="sm"
      onPress={() => console.log("item pressed")}
    >
      <CardBody className="overflow-visible p-0">
        <Image
          alt="product image"
          className="w-full object-cover h-[140px]"
          src="https://res.cloudinary.com/diygzkicn/image/upload/v1734460920/li7qh7homldhf7n9632f.jpg"
          width={140}
          height={140}
        />
      </CardBody>
      <CardFooter className="text-small justify-between">
        <small>{name}</small>
        <p className="text-default-500">{price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
