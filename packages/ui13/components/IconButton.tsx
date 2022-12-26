import classNames from 'classnames'
import React, { ReactNode } from 'react'

import { PolymorphicComponentPropsWithRef, PolymorphicRef } from '../types'

interface Props {
  children: ReactNode
  className?: string
  description?: string
}

export type IconButtonProps<C extends React.ElementType> = PolymorphicComponentPropsWithRef<C, Props>
export type IconButtonComponent = <C extends React.ElementType = 'button'>(
  props: IconButtonProps<C>
) => React.ReactElement | null

export const IconButton: IconButtonComponent = React.forwardRef(
  <Tag extends React.ElementType = 'button'>(
    { as, children, className, description, ...rest }: IconButtonProps<Tag>,
    ref?: PolymorphicRef<Tag>
  ) => {
    const Component = as || 'button'
    return (
      <Component
        ref={ref}
        type="button"
        {...rest}
        className={classNames(className, 'group relative focus:outline-none border:none')}
      >
        <span className="rounded-full absolute inset-0 -ml-1 -mr-1 -mb-1 -mt-1 bg-black" />
        {children}
        {description && (
          <span className="whitespace-nowrap text-xs group-hover:flex hidden absolute mt-2 w-full justify-center">
            {description}
          </span>
        )}
      </Component>
    )
  }
)
