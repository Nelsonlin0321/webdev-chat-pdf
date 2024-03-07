import apiClient from "@/app/services/api-client";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { chatId: string };
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const chatId = params.chatId;

  const chatFileKey = await prisma.chat.findFirst({
    where: { chatId: chatId },
    select: { fileKey: true },
  });

  await prisma.chat.deleteMany({
    where: { chatId: chatId },
  });

  await prisma.message.deleteMany({
    where: { chatId: chatId },
  });

  await prisma.embedding.deleteMany({
    where: { chatId: chatId },
  });

  if (chatFileKey) {
    const fileKey = chatFileKey.fileKey;
    await prisma.uploadedFile.deleteMany({ where: { fileKey: fileKey } });
    apiClient.delete("/delete_file", { data: { file_key: fileKey } });
  }

  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}