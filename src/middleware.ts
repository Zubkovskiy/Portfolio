import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES, isLocale } from '@/lib/i18n/config';

/**
 * Every page lives under a locale segment (/en, /ua). Anything that arrives
 * without one is redirected, using Accept-Language as a hint.
 */
function preferredLocale(request: NextRequest): string {
  const header = request.headers.get('accept-language') ?? '';
  // 'uk' is the language tag; the URL segment for it is 'ua'.
  if (/\buk\b/i.test(header)) return 'ua';
  const first = header.split(',')[0]?.split('-')[0]?.toLowerCase() ?? '';
  return isLocale(first) ? first : DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API routes, Next internals and anything with a file extension.
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
};
