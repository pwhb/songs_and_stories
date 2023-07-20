import { MONGODB_DATABASE } from "$env/static/private";
import DBKeys from "$lib/constants/DBKeys";
import clientPromise from "$lib/utils/mongodb";
import { get, remove } from "$lib/utils/s3";
import { json, type RequestHandler } from "@sveltejs/kit";
import { ObjectId } from "mongodb";


export const GET: RequestHandler = async ({ params }) =>
{
    try
    {
        const { id } = params;
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(DBKeys.UploadCollection);
        const doc = await col.findOne({ _id: new ObjectId(id) });
        if (!doc)
        {
            return json({ success: false, error: "not found" }, { status: 404 });
        }
        const res = (await get(doc.Key)) as any;

        return new Response(res?.Body, {
            headers: { 'Content-Type': res?.ContentType }
        });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};

export const DELETE: RequestHandler = async ({ params }) =>
{
    try
    {
        const { id } = params;
        const client = await clientPromise;
        const col = client.db(MONGODB_DATABASE).collection(DBKeys.UploadCollection);
        const doc = await col.findOne({ _id: new ObjectId(id) });
        if (!doc)
        {
            return json({
                success: false, error: {
                    message: "not found"
                }
            }, { status: 404 });
        }
        const res = await remove(doc.Key);
        const dbRes = await col.deleteOne({ _id: new ObjectId(id) });
        return json({ success: true }, { status: 200 });
    } catch (err)
    {
        console.error(err);
        return json({ success: false, error: err }, { status: 400 });
    }
};