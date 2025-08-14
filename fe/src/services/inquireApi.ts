export type InquireRequest = {
  name: string;
  email: string;
  inquiry_type: string;
  message: string;
};

export async function postInquire(data: InquireRequest) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/inquiries/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  return response;
}
