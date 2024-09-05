import StatSelector from "@/app/components/StatSelector";

export default function Layout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="relative w-screen h-screen bg-zinc-200">
            <StatSelector />
            {children}
        </div>
    );
}