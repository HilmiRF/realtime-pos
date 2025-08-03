import { environment } from "@/configs/environment";
import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	});

	const { SUPABASE_URL, SUPABASE_ANON_KEY } = environment;

	const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
		cookies: {
			getAll() {
				return request.cookies.getAll();
			},
			setAll(cookiesToSet) {
				cookiesToSet.forEach(({ name, value }) =>
					request.cookies.set(name, value)
				);
				supabaseResponse = NextResponse.next({ request });
				cookiesToSet.forEach(({ name, value, options }) =>
					supabaseResponse.cookies.set(name, value, options)
				);
			},
		},
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// if user is not found and tried to access dashboard, redirect to login
	if (!user && request.nextUrl.pathname !== "/login") {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	// if user is already logged in but tried to access login, redirect to home
	if (user && request.nextUrl.pathname === "/login") {
		const url = request.nextUrl.clone();
		url.pathname = "/";
		return NextResponse.redirect(url);
	}

	return supabaseResponse;
}
