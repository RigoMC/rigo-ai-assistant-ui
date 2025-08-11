// src/app/api/create_preference/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.NEXT_PUBLIC_MP_CLIENT_ID!,
});
const preferenceClient = new Preference(mercadopago);

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: "",
            title: body.title,
            quantity: body.quantity,
            unit_price: body.price,
            currency_id: "MXN",
          },
        ],
        back_urls: {
          success: "https://google.com/",
          failure: "https://www.youtube.com/",
          pending: "https://www.amazon.com.mx/",
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({ init_point: preference.init_point });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error creando preferencia." },
      { status: 500 }
    );
  }
}
