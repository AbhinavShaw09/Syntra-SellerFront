export function getImage(imageUrl: string) {
  const placeholderImage = "/image-placeholder.png";
  const finalImageSrc: string =
    typeof imageUrl === "string" && imageUrl !== ""
      ? imageUrl
      : placeholderImage;
  return finalImageSrc;
}
