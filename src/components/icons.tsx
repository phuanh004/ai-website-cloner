import { type SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function RivianLogo({ ...props }: IconProps) {
  return (
    <svg
      width="146"
      height="20"
      viewBox="0 0 146 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      {...props}
    >
      <title>Rivian</title>
      <path
        d="M19.8189 6.70028C19.8189 3.34012 17.5453 0.0805664 12.6559 0.0805664H0V20.0001H4.26559V3.64193H12.0322C14.4266 3.64193 15.5533 4.80894 15.5533 6.68016C15.5533 8.59163 14.4064 9.75863 12.0322 9.75863H8.7324C7.24346 9.75863 6.39839 10.6037 6.39839 12.0926V13.3401H8.77263C9.87927 13.3401 10.7042 13.7023 11.3883 14.5876L15.5936 19.9598H20.825L14.9698 12.5152C18.0684 11.8109 19.8189 9.75863 19.8189 6.70028Z"
        fill="currentColor"
      />
      <path
        d="M56.3984 15.4125L49.1751 0H44.6278L54.1248 19.9195H58.6721L68.1892 0H63.6218L56.3984 15.4125Z"
        fill="currentColor"
      />
      <path
        d="M35.2918 0H31.0262V19.9195H35.2918V0Z"
        fill="currentColor"
      />
      <path
        d="M141.469 0V14.7887L129.557 0H124.668V19.9195H128.793V5.13078L140.704 19.9195H145.594V0H141.469Z"
        fill="currentColor"
      />
      <path
        d="M100.986 0L91.207 19.9195H95.7543L96.9817 17.3642C97.4847 16.2777 98.2895 15.7948 99.4767 15.7948H106.881L105.996 13.9235C105.453 12.7565 104.567 12.2133 103.259 12.2133H99.4767L103.259 4.3662L110.764 19.9195H115.312L105.533 0H100.986Z"
        fill="currentColor"
      />
      <path
        d="M81.8508 0H77.5852V19.9195H81.8508V0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowLeftIcon({ ...props }: IconProps) {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M11.768 18.768a.328.328 0 0 0 .464 0l.77-.77a.328.328 0 0 0 0-.464l-4.65-4.659h10.32a.328.328 0 0 0 .328-.328v-1.094a.328.328 0 0 0-.328-.328H8.352l4.658-4.65a.328.328 0 0 0 0-.465l-.778-.778a.328.328 0 0 0-.464 0l-6.536 6.536a.328.328 0 0 0 0 .464l6.536 6.536Z" />
    </svg>
  );
}

export function ArrowRightIcon({ ...props }: IconProps) {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12.232 5.232a.328.328 0 0 0-.464 0l-.77.77a.328.328 0 0 0 0 .464l4.65 4.659H5.329a.328.328 0 0 0-.328.328v1.094c0 .181.147.328.328.328h10.32l-4.658 4.65a.328.328 0 0 0 0 .465l.778.778a.328.328 0 0 0 .464 0l6.536-6.536a.328.328 0 0 0 0-.464l-6.536-6.536Z" />
    </svg>
  );
}

export function HamburgerIcon({ ...props }: IconProps) {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <rect x="4" y="7" width="16" height="1.5" rx="0.75" />
      <rect x="4" y="11.25" width="16" height="1.5" rx="0.75" />
      <rect x="4" y="15.5" width="16" height="1.5" rx="0.75" />
    </svg>
  );
}

export function CloseIcon({ ...props }: IconProps) {
  return (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12 5.7 16.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z" />
    </svg>
  );
}
