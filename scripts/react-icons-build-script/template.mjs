// any combination of spaces and punctuation characters
// thanks to http://stackoverflow.com/a/25575009
const wordSeparators =
	/[\s\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+/;
//👆 convert hero_icon to HeroIcon
function pascalCase(str) {
	var words = str.split(wordSeparators);
	var len = words.length;
	var mappedWords = new Array(len);
	for (var i = 0; i < len; i++) {
		var word = words[i];
		if (word === "") {
			continue;
		}
		mappedWords[i] = word[0].toUpperCase() + word.slice(1);
	}
	return mappedWords.join("");
}

export const template = (props) => {
	if (props?.svg) {
		return `

export const ${props.name}Icon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
      ${props.svg(`
          shapeRendering="geometricPrecision"
          className={cn("w-6 h-6 group-active:scale-100 group-hover:scale-105 transition-transform",
            className
          )}
          {...others}
        `)}>
    );
}`;
	} else if (props?.solid && props?.outline) {
		const [solidPack, ..._solidIcon] = props?.solid.split(":");
		const [outlinePack, ..._outlineIcon] = props?.outline.split(":");
		//  import Recevied  from "~icons/heroicons-outline/plus-circle"
		const SolidIconName =
			pascalCase(solidPack) + pascalCase(_solidIcon.join(""));
		const OutlineIconName =
			pascalCase(outlinePack) + pascalCase(_outlineIcon.join(""));
		return `
import ${SolidIconName} from "~icons/${solidPack}/${_solidIcon}";
import ${OutlineIconName} from "~icons/${outlinePack}/${_outlineIcon}";

export const ${props.name}Icon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
    <span className="relative">
        <${OutlineIconName}
            shapeRendering="geometricPrecision"
            className={cn(
                \`w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 will-change-[opacity,transform] transition-[opacity,transform] duration-100 group-hover:duration-300\`,
                className
              )}
              {...others}
        />
        <${SolidIconName}
            shapeRendering="geometricPrecision"
            className={cn(
                \`w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100\`,
                className
              )}
              {...others}
        />
    </span>
    )
}`;
	} else {
		const [pack, ..._name] = props?.path.split(":");
		//  import Recevied  from "~icons/heroicons-outline/plus-circle"
		const Recevied = pascalCase(pack) + pascalCase(_name.join(""));
		return `
import ${Recevied} from "~icons/${pack}/${_name}";

export const ${props.name}Icon = (
    props: Omit<PropsWithoutRef<SVGProps<ReactSVGElement>>, 'className'> & {
      className?: ClassValue;
    } & RefAttributes<SVGSVGElement>
  ) => {
    const { className, ...others } = props;
    return (
        <${Recevied}
            shapeRendering="geometricPrecision"
            className={cn("w-6 h-6 group-active:scale-100 group-hover:scale-105 transition-transform",
                className
            )}
            {...others}
        />
    )
}`;
	}
};
