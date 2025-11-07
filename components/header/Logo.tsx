import Link from "next/link";

export default function Logo () {
    return (
         
            <Link href="/" className="flex flex-col items-start">
            <span className="text-xl font-bold text-blue-900 hover:text-blue-700">&Lambda;SP&Lambda;CT</span>
            <span className="text-xs">AI Super PAC Ad Tracker - GROUP</span>
            </Link>
       
    )
}