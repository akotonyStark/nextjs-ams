import Link from "next/link";

export default function Unauthorized() {
    return(
        <div>Unauthorized Users <br/><Link href={'/analytics'}>Authorized Users</Link></div>
    )
}