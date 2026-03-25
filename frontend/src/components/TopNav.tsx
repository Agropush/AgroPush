'use client';

import Link from 'next/link';
import { ChevronRight, Bell, User, } from 'lucide-react';

interface TopAppBarProps {
  title: string;
  breadcrumbs?: { label: string; path?: string }[];
  networkStatus?: 'mainnet' | 'testnet';
}

export function TopNav({ title, breadcrumbs, networkStatus }: TopAppBarProps) {
  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-card/80 backdrop-blur-md border-b border-border-default flex items-center px-6">
      <div className="flex-shrink-0 flex items-center gap-6 mr-12">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#5c0f49] rounded-md px-2 py-1"
              aria-label="Amana home page"
            >
              <span className="font-manrope font-bold text-[24px] leading-[32px] tracking-[-1.2px] text-[#F2C36B] ml-2">Amana</span>
            </Link>
      </div>
      <div className="flex items-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground mx-2" />}
                  {crumb.path ? (
                    <Link href={crumb.path} className="text-sm hover:text-foreground transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-sm text-muted-foreground">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>

      <div className="ml-auto flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Bell className="w-4 h-4 hover-bg-[#F2C36B]" />
        </button>
        {networkStatus && (
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            networkStatus === 'mainnet' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {networkStatus}
          </span>
        )}
         <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <User className="w-4 h-4 hover-bg-[#F2C36B]" />
        </button>
      </div>
    </header>
  );
}