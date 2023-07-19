import * as React from 'react';
import type {
  PropsWithoutRef,
  SVGProps,
  RefAttributes,
  ReactSVGElement
} from 'react';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import FluentPerson48Filled from "~icons/fluent/person-48-filled";
import FluentPerson48Regular from "~icons/fluent/person-48-regular";

export const ProfileIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentPerson48Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentPerson48Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentPen48Filled from "~icons/fluent/pen-48-filled";
import FluentPen48Regular from "~icons/fluent/pen-48-regular";

export const PenIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentPen48Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentPen48Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentNotebook24Filled from "~icons/fluent/notebook-24-filled";
import FluentNotebook24Regular from "~icons/fluent/notebook-24-regular";

export const NotebookIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentNotebook24Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentNotebook24Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentBoardSplit16Filled from "~icons/fluent/board-split-16-filled";
import FluentBoardSplit16Regular from "~icons/fluent/board-split-16-regular";

export const BoardIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentBoardSplit16Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentBoardSplit16Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentLineHorizontal320Filled from "~icons/fluent/line-horizontal-3-20-filled";
import FluentLineHorizontal320Regular from "~icons/fluent/line-horizontal-3-20-regular";

export const MenuIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentLineHorizontal320Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentLineHorizontal320Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import HeroiconsSolidX from "~icons/heroicons-solid/x";
import HeroiconsOutlineX from "~icons/heroicons-outline/x";

export const XIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <HeroiconsOutlineX
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <HeroiconsSolidX
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentArrowDownload24Filled from "~icons/fluent/arrow-download-24-filled";
import FluentArrowDownload24Regular from "~icons/fluent/arrow-download-24-regular";

export const DownloadIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentArrowDownload24Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentArrowDownload24Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentPanelTopExpand20Filled from "~icons/fluent/panel-top-expand-20-filled";
import FluentPanelTopExpand20Regular from "~icons/fluent/panel-top-expand-20-regular";

export const ExpandTopIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentPanelTopExpand20Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentPanelTopExpand20Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentPanelTopContract20Filled from "~icons/fluent/panel-top-contract-20-filled";
import FluentPanelTopContract20Regular from "~icons/fluent/panel-top-contract-20-regular";

export const ContractTopIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentPanelTopContract20Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentPanelTopContract20Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import HeroiconsSolidChatAlt2 from "~icons/heroicons-solid/chat-alt-2";
import HeroiconsOutlineChatAlt2 from "~icons/heroicons-outline/chat-alt-2";

export const ChatIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <HeroiconsOutlineChatAlt2
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <HeroiconsSolidChatAlt2
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import HeroiconsSolidChevronRight from "~icons/heroicons-solid/chevron-right";
import HeroiconsOutlineChevronRight from "~icons/heroicons-outline/chevron-right";

export const ChevronRightIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <HeroiconsOutlineChevronRight
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <HeroiconsSolidChevronRight
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentLinkSquare24Filled from "~icons/fluent/link-square-24-filled";
import FluentLinkSquare24Regular from "~icons/fluent/link-square-24-regular";

export const LinkIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentLinkSquare24Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentLinkSquare24Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentClipboardCode24Filled from "~icons/fluent/clipboard-code-24-filled";
import FluentClipboardCode24Regular from "~icons/fluent/clipboard-code-24-regular";

export const ClipboardCodeIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentClipboardCode24Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentClipboardCode24Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentCode24Filled from "~icons/fluent/code-24-filled";
import FluentCode24Regular from "~icons/fluent/code-24-regular";

export const CodeIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentCode24Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentCode24Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentClipboardCheckmark24Filled from "~icons/fluent/clipboard-checkmark-24-filled";
import FluentClipboardCheckmark24Regular from "~icons/fluent/clipboard-checkmark-24-regular";

export const ClipboardCheckIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentClipboardCheckmark24Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentClipboardCheckmark24Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import FluentShare48Filled from "~icons/fluent/share-48-filled";
import FluentShare48Regular from "~icons/fluent/share-48-regular";

export const ShareIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <FluentShare48Regular
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300`,
                className
              )}
              {...others}
        />
        <FluentShare48Filled
            shapeRendering="geometricPrecision"
            className={cn(
                `w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100`,
                className
              )}
              {...others}
        />
    </span>
    )
}
import EosIconsLoading from "~icons/eos-icons/loading";

export const LoadingIcon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
        <EosIconsLoading
            shapeRendering="geometricPrecision"
            className={cn("w-6 h-6 group-active:scale-100 group-hover:scale-105 transition-transform",
                className
            )}
            {...others}
        />
    )
}