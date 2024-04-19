import DomToImage from "dom-to-image";

export async function cloneImage(scale) {
  const postElement = document.querySelector("#post-preview");

  const width = postElement.offsetWidth * scale;
  const height = postElement.offsetHeight * scale;

  const dataUrl = await DomToImage.toJpeg(postElement, {
    quality: 1.0,
    width: width,
    height: height,
    style: {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
    },
  });
  return dataUrl;
}

export async function exportImage() {
  const finalOuputSize = 1200; // Taille d'export souhaité
  const currentPostSize = document.querySelector("#post-preview").offsetWidth;
  const scale = finalOuputSize / currentPostSize;
  const dataUrl = await cloneImage(scale);

  const link = document.createElement("a");
  link.download = "post.jpg";
  link.href = dataUrl;
  link.click();
}

// Function to update post content based on input
export function updatePostContent(postElement, inputElement) {
  postElement.innerText = inputElement.value;
}