import Link from 'next/link';

export interface Footer1Items {
  title: string;
  href?: string;
  description: string;
  external?: boolean;
  items?: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export const Footer1 = () => {
  const navigationItems: Footer1Items[] = [
    {
      title: 'Socials',
      description: 'Connect with me on socials',
      items: [
        {
          title: 'Twitter',
          href: 'https://twitter.com/byjit',
          external: true,
        },
        {
          title: 'Instagram',
          href: 'https://www.instagram.com/byjit/',
          external: true,
        },
        {
          title: 'Github',
          href: 'https://github.com/byjit',
          external: true,
        },
      ],
    },
  ];

  return (
    <div
      id="contact"
      className="w-full bg-foreground px-4 py-20 text-background lg:py-40"
    >
      <div className="container mx-auto">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-regular max-w-xl text-left text-3xl tracking-tighter md:text-5xl">
                Hi! This is Jit
              </h2>
              <p className="max-w-lg text-left text-lg leading-relaxed tracking-tight text-background/75">
                If you liked this website, consider connecting with me and let
                me know. I would be happy :)
              </p>
            </div>
            <div className="flex flex-row gap-20">
              <div className="flex max-w-lg flex-col text-left text-sm leading-relaxed tracking-tight text-background/75">
                <p>
                  Mail me at:{' '}
                  <Link
                    href="mailto:rely.prasanjit@gmail.com"
                    className="underline"
                  >
                    rely.prasanjit@gmail.com
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="grid items-start gap-10 lg:grid-cols-3">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-start gap-1 text-base"
              >
                <div className="flex flex-col gap-2">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex items-center justify-between"
                    >
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  ) : (
                    <p className="text-xl">{item.title}</p>
                  )}
                  {item.items
                    ? item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="flex items-center justify-between"
                        >
                          <span className="text-background/75">
                            {subItem.title}
                          </span>
                        </Link>
                      ))
                    : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
