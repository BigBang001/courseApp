import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { getServerSession } from 'next-auth/next'
import prisma from '@/lib/prisma'
import { authOptions } from '../auth/[...nextauth]/options'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const formData = await request.formData()
        const file = formData.get('avatar') as File | null

        if (!file) {
            return NextResponse.json({
                error: 'No file uploaded'
            }, { status: 400 })
        }

        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'avatars' },
                (error, result) => {
                    if (error) reject(error)
                    else resolve(result)
                }
            ).end(buffer)
        })

        if (!uploadResult || typeof uploadResult !== 'object' || !('secure_url' in uploadResult)) {
            throw new Error('Invalid upload result')
        }

        const avatarUrl = uploadResult.secure_url

        // Update user's avatar URL in the database
        await prisma.user.update({
            where: { id: session.user.id },
            data: { image: avatarUrl as string }
        })

        return NextResponse.json({ message: 'Avatar uploaded successfully', avatarUrl }, { status: 200 })
    } catch (error) {
        console.error('Error uploading avatar:', error)
        return NextResponse.json({ error: 'Error uploading avatar' }, { status: 500 })
    }
}
