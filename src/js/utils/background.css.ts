import { globalStyle, style } from '@vanilla-extract/css';

import { backgroundAndTextColors, normalizeBackground } from './background';

const normalizeBackgroundImage = (background, theme) => {
  if (!background) return undefined;

  if (background.image) {
    const token = background.dark
      ? theme.global.backgrounds?.[background.image]?.dark
      : theme.global.backgrounds?.[background.image];
    return normalizeBackground(token, theme) || background.image;
  }

  const normalized = normalizeBackground(
    theme.global.backgrounds?.[background],
    theme,
  );
  if (typeof normalized === 'object')
    return normalizeBackgroundImage(normalized, theme);
  return normalized;
};

const rotateBackground = (background, theme) => {
  const backgroundImage = normalizeBackgroundImage(background, theme);
  if (!backgroundImage) return backgroundImage;
  if (backgroundImage.lastIndexOf('linear-gradient', 0) !== 0)
    return backgroundImage;

  const regex = /\d{1,}deg\b,/gm;
  return backgroundImage.lastIndexOf('deg,') >= 0
    ? backgroundImage.replace(regex, `${background.rotate}deg,`)
    : backgroundImage.replace(
        'linear-gradient(',
        `linear-gradient(${background.rotate}deg, `,
      );
};

export const backgroundImageStyle = style({
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
});

export const backgroundTextClipStyle = style({
  WebkitTextFillColor: 'transparent',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
});

export const backgroundOverlayContainerStyle = style({
  position: 'relative',
  zIndex: 0,
});

export const backgroundOverlayStyle = style({
  position: 'absolute',
  inset: 0,
  zIndex: -1,
  borderRadius: 'inherit',
});

globalStyle(`${backgroundOverlayStyle}::before`, {
  content: '',
});

export const resolveBackgroundStyles = (backgroundArg, theme, textColorArg) => {
  if (backgroundArg === undefined) return undefined;

  const background = normalizeBackground(backgroundArg, theme);
  const [backgroundColor, textColor] = backgroundAndTextColors(
    background,
    textColorArg,
    theme,
  );
  const backgroundImage =
    background && typeof background === 'object' && background.rotate
      ? rotateBackground(background, theme)
      : normalizeBackgroundImage(background, theme);

  if (
    typeof background === 'string' &&
    background.lastIndexOf('url', 0) === 0
  ) {
    return {
      className: backgroundImageStyle,
      style: {
        background: `${background} no-repeat center center`,
        backgroundSize: 'cover',
        ...(textColor ? { color: textColor } : {}),
      },
    };
  }

  const styleObject = {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(backgroundImage ? { backgroundImage } : {}),
    ...(backgroundImage
      ? {
          backgroundRepeat:
            (typeof background === 'object' && background.repeat) ||
            'no-repeat',
          backgroundPosition:
            (typeof background === 'object' && background.position) ||
            'center center',
          backgroundSize:
            (typeof background === 'object' && background.size) || 'cover',
        }
      : {}),
    ...(textColor ? { color: textColor } : {}),
  };

  const classNames = [];
  if (backgroundImage) classNames.push(backgroundImageStyle);
  if (typeof background === 'object' && background.clip === 'text') {
    classNames.push(backgroundTextClipStyle);
  }

  return {
    className: classNames.join(' '),
    style: Object.keys(styleObject).length ? styleObject : undefined,
    overlayClassName:
      typeof background === 'object' && background.opacity
        ? `${backgroundOverlayContainerStyle} ${backgroundOverlayStyle}`
        : undefined,
  };
};

export const resolveBackgroundOverlayStyle = (backgroundArg, theme) => {
  if (
    !backgroundArg ||
    typeof backgroundArg !== 'object' ||
    !backgroundArg.opacity
  ) {
    return undefined;
  }

  const background = normalizeBackground(backgroundArg, theme);
  const [backgroundColor] = backgroundAndTextColors(background, false, theme);
  const backgroundImage = background.rotate
    ? rotateBackground(background, theme)
    : normalizeBackgroundImage(background, theme);

  return {
    ...(backgroundColor ? { backgroundColor } : {}),
    ...(backgroundImage ? { backgroundImage } : {}),
    ...(backgroundImage
      ? {
          backgroundRepeat: background.repeat || 'no-repeat',
          backgroundPosition: background.position || 'center center',
          backgroundSize: background.size || 'cover',
        }
      : {}),
    opacity:
      background.opacity === true
        ? theme.global.opacity.medium
        : theme.global.opacity[background.opacity] || background.opacity,
  };
};
