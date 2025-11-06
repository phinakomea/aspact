import Link from "next/link";

export default function Logo () {
    return (
         <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            &Lambda;SP&Lambda;CT
            </Link>
        </div>
    )
}