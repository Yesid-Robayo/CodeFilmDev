// Función para convertir un blob a base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            const base64Content = base64String.split(',')[1]; 
            resolve(base64Content);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
