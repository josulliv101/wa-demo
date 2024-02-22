import image1 from "../../public/slide-1.jpg";
import image2 from "../../public/slide-2.jpg";
import image3 from "../../public/slide-3.jpg";
import image4 from "../../public/slide-4.jpg";

export const images: any[] = [image1, image2, image3, image4];

const imageByIndex = (index: number): string => images[index % images.length];

export default [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/id/870/200/300",
];
