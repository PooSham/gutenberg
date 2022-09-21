/**
 * External dependencies
 */
import type * as React from 'react';

// Based on https://github.com/reakit/reakit/blob/master/packages/reakit-utils/src/types.ts
export type WordPressComponentProps<
	/** Prop types. */
	P,
	/** The HTML element to inherit props from. */
	T extends React.ElementType,
	/** Supports polymorphism through the `as` prop. */
	IsPolymorphic extends boolean = true
> = P &
	// The `children` prop is being explicitly omitted since it is otherwise implicitly added
	// by `ComponentPropsWithRef`. The context is that components should require the `children`
	// prop explicitely when needed (see https://github.com/WordPress/gutenberg/pull/31817).
	Omit< React.ComponentPropsWithoutRef< T >, 'as' | keyof P | 'children' > &
	( IsPolymorphic extends true
		? {
				/** The HTML element or React component to render the component as. */
				as?: T | keyof JSX.IntrinsicElements;
		  }
		: {} );

export type WordPressComponent<
	T extends React.ElementType,
	O,
	IsPolymorphic extends boolean
> = {
	< TT extends React.ElementType >(
		props: WordPressComponentProps< O, TT, IsPolymorphic > &
			( IsPolymorphic extends true ? { as: TT } : {} )
	): JSX.Element | null;
	(
		props: WordPressComponentProps< O, T, IsPolymorphic >
	): JSX.Element | null;
	displayName?: string;
	/**
	 * A CSS selector used to fake component interpolation in styled components
	 * for components not generated by `styled`. Anything passed to `contextConnect`
	 * will get this property.
	 *
	 * We restrict it to a class to align with the already existing class names that
	 * are generated by the context system.
	 */
	selector: `.${ string }`;
};

export type WordPressComponentFromProps<
	Props,
	ForwardsRef extends boolean = true
> = Props extends WordPressComponentProps< infer P, infer T, infer I >
	? WordPressComponent<
			T,
			P & ( ForwardsRef extends true ? React.RefAttributes< any > : {} ),
			I
	  >
	: never;
