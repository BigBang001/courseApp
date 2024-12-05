import { Metadata } from "next";
import CourseDetail from "@/components/Course/CourseDetail";

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export async function generateMetadata({
  params,
}: CoursePageProps): Promise<Metadata> {
  const course = await getCourse(params.courseId);

  return {
    title: `${course.name} | CoursePros`,
    description: course.description,
  };
}

async function getCourse(courseId: string) {
  return {
    id: "1",
    courseId: "advanced-react-patterns",
    name: "Advanced React Patterns",
    description:
      "Master advanced React patterns and take your development skills to the next level.",
    price: 99.99,
    duration: "6 weeks",
    instructor: "Jane Doe",
    topics: [
      "Render Props",
      "Higher-Order Components",
      "Hooks",
      "Context API",
      "Performance Optimization",
    ],
  };
}

export default async function CoursePage() {
  return <CourseDetail />;
}
