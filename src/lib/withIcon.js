import React, { memo } from 'react'
import { getSize, getThemeProp, getStroke, getOpacity } from './utils'
import { IconlyContext } from './context'
import PropTypes from 'prop-types'

function withIcon(Component) {
  class IconWrapper extends React.Component {
    static contextType = IconlyContext
    render() {
      const {
        size,
        label,
        primaryColor,
        secondaryColor,
        filled,
        set,
        style,
        stroke,
        ...restProps
      } = this.props
      const theme = this.context
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={getSize(size) || getThemeProp('size', theme) || '24px'}
          height={getSize(size) || getThemeProp('size', theme) || '24px'}
          viewBox='0 0 24 24'
          role={label ? 'img' : 'presentation'}
          aria-label={label || undefined}
          style={{ ...style }}
          {...restProps}
        >
          <Component
            color={
              primaryColor ||
              getThemeProp('primaryColor', theme) ||
              'currentColor'
            }
            opacity={getOpacity(primaryColor, secondaryColor)}
            secondaryColor={
              secondaryColor ||
              getThemeProp('secondaryColor', theme) ||
              primaryColor ||
              'currentColor'
            }
            set={filled ? 'bold' : set || getThemeProp('set', theme) || 'light'}
            strokeWidth={
              stroke
                ? getStroke(stroke)
                : getThemeProp('stroke', theme) || '1.5px'
            }
          />
        </svg>
      )
    }
  }
  IconWrapper.propTypes = {
    /**
     * String to use as the aria-label for the icon.
     * **Use an empty string when you already have readable text around the icon,
     * like text inside a button**!
     */
    label: PropTypes.string,

    /**
     * Set de icons sets to 'bold'
     */
    filled: PropTypes.bool,

    /**
     * For primary colour for icons.
     */
    primaryColor: PropTypes.string,

    /**
     * For secondary colour for 2-color icons.
     */
    secondaryColor: PropTypes.string,

    /**
     * Control the size of the icon.
     */
    size: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(['small', 'medium', 'large', 'xlarge'])
    ]),

    /**
     * Icon set option
     *- Bold
     *- Bulk
     *- Light - Border (default)
     *- Light - Outline
     *- Broken
     *- Two Tone
     */
    set: PropTypes.oneOf(['bold', 'bulk', 'light', 'broken', 'two-tone']),

    /**
     * Line Stroke option
     */
    stroke: PropTypes.oneOf(['light', 'regular', 'bold']),

    /**
     * Custom styles property
     */
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
  }

  const memoIcon = memo(IconWrapper)
  return memoIcon
}

export default withIcon