import { DarkModeToggle } from "@/components/commons/darkmode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
	return (
		<div className="">
			<Input />
			<Button>Sign In</Button>
			<DarkModeToggle />
		</div>
	);
}
