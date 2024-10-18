import { createWixClient } from "@/utils/createWixClient";
import { logError } from "@/utils/utilityFunctions";
import { NextResponse } from "next/server";

export const POST = async (req, { params }) => {
    const { name } = params;

    try {
        const wixClient = await createWixClient();

        if (name === "contact" || name === "newsletter") {
            const id = name === "contact" ? process.env.WIX_CLIENT_CORPORATE_CONTACT_FORM_ID : process.env.WIX_CLIENT_CORPORATE_NEWSLETTER_ID;
            const data = await req.json()

            const response = await wixClient.submissions.createSubmission({
                formId: id,
                status: "CONFIRMED",
                submissions: data,
            });
            return NextResponse.json(response, { status: 200 });
        } else {
            return NextResponse.json({
                message: "Error in POST method: Invalid request",
                body: req.body,
            }, { status: 400 });
        }
    } catch (error) {
        logError("Error in form submission:", error);
        return NextResponse.json({
            message: error.message,
            body: req.body,
        }, { status: 500 });
    }
};
