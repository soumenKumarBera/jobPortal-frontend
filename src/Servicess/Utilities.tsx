import { time } from "console";

const formateDate = (dateString: string) => {
  const date = new Date(dateString);
  const optioons = { year: "numeric" as const, month: "short" as const };
  return date.toLocaleString("en-US", optioons);
};

const timeAgo = (time: string) => {
  const now = new Date();
  const postDate = new Date(time);
  const diff = now.getTime() - postDate.getTime(); // Difference in milliseconds

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else {
    return `&{months} months ago`;
  }
};

const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const formateInterviewTime = (dateTime: any) => {
  const date = new Date(dateTime);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

// resume a show new tap......... 
function openBase64PDF(base64String: string) {
  const byteCharacters = atob(base64String);

  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  const blob = new Blob([byteArray], { type: "application/pdf" });

  const blobURL = URL.createObjectURL(blob);

  window.open(blobURL, "_blank");
}

export { formateDate, timeAgo, getBase64, formateInterviewTime, openBase64PDF };
