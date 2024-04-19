import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
});

const getFile = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    });

    const signedUrl = await getSignedUrl(client, command);
    return signedUrl;
}

const uploadFile = async (file) => {
    const key = file.originalname + Date.now();

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `product-images/${key}`,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        await client.send(command);
        return await getFile(`product-images/${key}`);
    } catch (err) {
        console.error(err);
    }
}

export { uploadFile };