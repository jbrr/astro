import type {
	MarkdownHeading,
	MarkdownMetadata,
	MarkdownRenderingResult,
	RehypePlugins,
	RemarkPlugins,
	RemarkRehype,
	ShikiConfig,
} from '@astrojs/markdown-remark';
import type * as babel from '@babel/core';
import type { OutgoingHttpHeaders } from 'node:http';
import type { AddressInfo } from 'node:net';
import type * as rollup from 'rollup';
import type { TsConfigJson } from 'tsconfig-resolver';
import type * as vite from 'vite';
import type { z } from 'zod';
import type { SerializedSSRManifest } from '../core/app/types';
import type { PageBuildData } from '../core/build/types';
import type { AstroConfigSchema } from '../core/config';
import type { AstroTimer } from '../core/config/timer';
import type { AstroCookies } from '../core/cookies';
import type { LogOptions, LoggerLevel } from '../core/logger/core';
import type { AstroComponentFactory, AstroComponentInstance } from '../runtime/server';
import type { SUPPORTED_MARKDOWN_FILE_EXTENSIONS } from './../core/constants.js';
export type {
	MarkdownHeading,
	MarkdownMetadata,
	MarkdownRenderingResult,
	RehypePlugins,
	RemarkPlugins,
	ShikiConfig,
} from '@astrojs/markdown-remark';
export type {
	ExternalImageService,
	ImageService,
	LocalImageService,
} from '../assets/services/service';
export type {
	GetImageResult,
	ImageInputFormat,
	ImageMetadata,
	ImageOutputFormat,
	ImageQuality,
	ImageQualityPreset,
	ImageTransform,
} from '../assets/types';
export type { SSRManifest } from '../core/app/types';
export type { AstroCookies } from '../core/cookies';

export interface AstroBuiltinProps {
	'client:load'?: boolean;
	'client:idle'?: boolean;
	'client:media'?: string;
	'client:visible'?: boolean;
	'client:only'?: boolean | string;
}

export interface TransitionAnimation {
	name: string; // The name of the keyframe
	delay?: number | string;
	duration?: number | string;
	easing?: string;
	fillMode?: string;
	direction?: string;
}

export interface TransitionAnimationPair {
	old: TransitionAnimation | TransitionAnimation[];
	new: TransitionAnimation | TransitionAnimation[];
}

export interface TransitionDirectionalAnimations {
	forwards: TransitionAnimationPair;
	backwards: TransitionAnimationPair;
}

export type TransitionAnimationValue = 'morph' | 'slide' | 'fade' | TransitionDirectionalAnimations;

// Allow users to extend this for astro-jsx.d.ts
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AstroClientDirectives {}

export interface AstroBuiltinAttributes {
	'class:list'?:
		| Record<string, boolean>
		| Record<any, any>
		| Iterable<string>
		| Iterable<any>
		| string;
	'set:html'?: any;
	'set:text'?: any;
	'is:raw'?: boolean;
	'transition:animate'?: 'morph' | 'slide' | 'fade' | TransitionDirectionalAnimations;
	'transition:name'?: string;
	'transition:persist'?: boolean | string;
}

export interface AstroDefineVarsAttribute {
	'define:vars'?: any;
}

export interface AstroStyleAttributes {
	/** @deprecated Use `is:global` instead */
	global?: boolean;
	'is:global'?: boolean;
	'is:inline'?: boolean;
}

export interface AstroScriptAttributes {
	/** @deprecated Hoist is now the default behavior */
	hoist?: boolean;
	'is:inline'?: boolean;
}

export interface AstroComponentMetadata {
	displayName: string;
	hydrate?: 'load' | 'idle' | 'visible' | 'media' | 'only';
	hydrateArgs?: any;
	componentUrl?: string;
	componentExport?: { value: string; namespace?: boolean };
	astroStaticSlot: true;
}

/** The flags supported by the Astro CLI */
export interface CLIFlags {
	root?: string;
	site?: string;
	base?: string;
	host?: string | boolean;
	port?: number;
	config?: string;
	drafts?: boolean;
	open?: boolean;
	experimentalAssets?: boolean;
}

/**
 * Astro global available in all contexts in .astro files
 *
 * [Astro reference](https://docs.astro.build/reference/api-reference/#astro-global)
 */
export interface AstroGlobal<Props extends Record<string, any> = Record<string, any>>
	extends AstroGlobalPartial,
		AstroSharedContext<Props> {
	/**
	 * A full URL object of the request URL.
	 * Equivalent to: `new URL(Astro.request.url)`
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#url)
	 */
	url: AstroSharedContext['url'];
	/** Parameters passed to a dynamic page generated using [getStaticPaths](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
	 *
	 * Example usage:
	 * ```astro
	 * ---
	 * export async function getStaticPaths() {
	 *    return [
	 *     { params: { id: '1' } },
	 *   ];
	 * }
	 *
	 * const { id } = Astro.params;
	 * ---
	 * <h1>{id}</h1>
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroparams)
	 */
	params: AstroSharedContext['params'];
	/** List of props passed to this component
	 *
	 * A common way to get specific props is through [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment), ex:
	 * ```typescript
	 * const { name } = Astro.props
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/core-concepts/astro-components/#component-props)
	 */
	props: AstroSharedContext<Props>['props'];
	/** Information about the current request. This is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
	 *
	 * For example, to get a URL object of the current URL, you can use:
	 * ```typescript
	 * const url = new URL(Astro.request.url);
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrorequest)
	 */
	request: Request;
	/** Information about the outgoing response. This is a standard [ResponseInit](https://developer.mozilla.org/en-US/docs/Web/API/Response/Response#init) object
	 *
	 * For example, to change the status code you can set a different status on this object:
	 * ```typescript
	 * Astro.response.status = 404;
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroresponse)
	 */
	response: ResponseInit & {
		readonly headers: Headers;
	};
	/** Redirect to another page (**SSR Only**)
	 *
	 * Example usage:
	 * ```typescript
	 * if(!isLoggedIn) {
	 *   return Astro.redirect('/login');
	 * }
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/guides/server-side-rendering/#astroredirect)
	 */
	redirect: AstroSharedContext['redirect'];
	/**
	 * The <Astro.self /> element allows a component to reference itself recursively.
	 *
	 * [Astro reference](https://docs.astro.build/en/guides/api-reference/#astroself)
	 */
	self: AstroComponentFactory;
	/** Utility functions for modifying an Astro component’s slotted children
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
	 */
	slots: Record<string, true | undefined> & {
		/**
		 * Check whether content for this slot name exists
		 *
		 * Example usage:
		 * ```typescript
		 *	if (Astro.slots.has('default')) {
		 *   // Do something...
		 *	}
		 * ```
		 *
		 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
		 */
		has(slotName: string): boolean;
		/**
		 * Asynchronously renders this slot and returns a string
		 *
		 * Example usage:
		 * ```astro
		 * ---
		 * let html: string = '';
		 * if (Astro.slots.has('default')) {
		 *   html = await Astro.slots.render('default')
		 * }
		 * ---
		 * <Fragment set:html={html} />
		 * ```
		 *
		 * A second parameters can be used to pass arguments to a slotted callback
		 *
		 * Example usage:
		 * ```astro
		 * ---
		 * html = await Astro.slots.render('default', ["Hello", "World"])
		 * ---
		 * ```
		 * Each item in the array will be passed as an argument that you can use like so:
		 * ```astro
		 * <Component>
		 *		{(hello, world) => <div>{hello}, {world}!</div>}
		 * </Component>
		 * ```
		 *
		 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroslots)
		 */
		render(slotName: string, args?: any[]): Promise<string>;
	};
}

/** Union type of supported markdown file extensions */
type MarkdowFileExtension = (typeof SUPPORTED_MARKDOWN_FILE_EXTENSIONS)[number];

export interface AstroGlobalPartial {
	/**
	 * Fetch local files into your static site setup
	 *
	 * Example usage:
	 * ```typescript
	 * const posts = await Astro.glob('../pages/post/*.md');
	 * ```
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astroglob)
	 */
	glob(globStr: `${any}.astro`): Promise<AstroInstance[]>;
	glob<T extends Record<string, any>>(
		globStr: `${any}${MarkdowFileExtension}`
	): Promise<MarkdownInstance<T>[]>;
	glob<T extends Record<string, any>>(globStr: `${any}.mdx`): Promise<MDXInstance<T>[]>;
	glob<T extends Record<string, any>>(globStr: string): Promise<T[]>;
	/**
	 * Returns a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) object built from the [site](https://docs.astro.build/en/reference/configuration-reference/#site) config option
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrosite)
	 */
	site: URL | undefined;
	/**
	 * Returns a string with the current version of Astro.
	 *
	 * Useful for using `<meta name="generator" content={Astro.generator} />` or crediting Astro in a site footer.
	 *
	 * [HTML Specification for `generator`](https://html.spec.whatwg.org/multipage/semantics.html#meta-generator)
	 *
	 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#astrogenerator)
	 */
	generator: string;
}

type ServerConfig = {
	/**
	 * @name server.host
	 * @type {string | boolean}
	 * @default `false`
	 * @version 0.24.0
	 * @description
	 * Set which network IP addresses the dev server should listen on (i.e. 	non-localhost IPs).
	 * - `false` - do not expose on a network IP address
	 * - `true` - listen on all addresses, including LAN and public addresses
	 * - `[custom-address]` - expose on a network IP address at `[custom-address]`
	 */
	host?: string | boolean;

	/**
	 * @name server.port
	 * @type {number}
	 * @default `3000`
	 * @description
	 * Set which port the dev server should listen on.
	 *
	 * If the given port is already in use, Astro will automatically try the next available port.
	 */
	port?: number;

	/**
	 * @name server.headers
	 * @typeraw {OutgoingHttpHeaders}
	 * @default `{}`
	 * @version 1.7.0
	 * @description
	 * Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.
	 */
	headers?: OutgoingHttpHeaders;

	/**
	 * @name server.open
	 * @type {boolean}
	 * @default `false`
	 * @version 2.1.8
	 * @description
	 * Control whether the dev server should open in your browser window on startup.
	 *
	 * ```js
	 * {
	 *   server: { open: true }
	 * }
	 * ```
	 */
	open?: boolean;
};

export interface ViteUserConfig extends vite.UserConfig {
	ssr?: vite.SSROptions;
}

export interface ImageServiceConfig {
	// eslint-disable-next-line @typescript-eslint/ban-types
	entrypoint: 'astro/assets/services/sharp' | 'astro/assets/services/squoosh' | (string & {});
	config?: Record<string, any>;
}

/**
 * Astro User Config
 * Docs: https://docs.astro.build/reference/configuration-reference/
 */
export interface AstroUserConfig {
	/**
	 * @docs
	 * @kind heading
	 * @name Top-Level Options
	 */

	/**
	 * @docs
	 * @name root
	 * @cli --root
	 * @type {string}
	 * @default `"."` (current working directory)
	 * @summary Set the project root. The project root is the directory where your Astro project (and all `src`, `public` and `package.json` files) live.
	 * @description  You should only provide this option if you run the `astro` CLI commands in a directory other than the project root directory. Usually, this option is provided via the CLI instead of the [Astro config file](https://docs.astro.build/en/guides/configuring-astro/#supported-config-file-types), since Astro needs to know your project root before it can locate your config file.
	 *
	 * If you provide a relative path (ex: `--root: './my-project'`) Astro will resolve it against your current working directory.
	 *
	 * #### Examples
	 *
	 * ```js
	 * {
	 *   root: './my-project-directory'
	 * }
	 * ```
	 * ```bash
	 * $ astro build --root ./my-project-directory
	 * ```
	 */
	root?: string;

	/**
	 * @docs
	 * @name srcDir
	 * @type {string}
	 * @default `"./src"`
	 * @description Set the directory that Astro will read your site from.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   srcDir: './www'
	 * }
	 * ```
	 */
	srcDir?: string;

	/**
	 * @docs
	 * @name publicDir
	 * @type {string}
	 * @default `"./public"`
	 * @description
	 * Set the directory for your static assets. Files in this directory are served at `/` during dev and copied to your build directory during build. These files are always served or copied as-is, without transform or bundling.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   publicDir: './my-custom-publicDir-directory'
	 * }
	 * ```
	 */
	publicDir?: string;

	/**
	 * @docs
	 * @name outDir
	 * @type {string}
	 * @default `"./dist"`
	 * @see build.server
	 * @description Set the directory that `astro build` writes your final build to.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   outDir: './my-custom-build-directory'
	 * }
	 * ```
	 */
	outDir?: string;

	/**
	 * @docs
	 * @name cacheDir
	 * @type {string}
	 * @default `"./node_modules/.astro"`
	 * @description Set the directory for caching build artifacts. Files in this directory will be used in subsequent builds to speed up the build time.
	 *
	 * The value can be either an absolute file system path or a path relative to the project root.
	 *
	 * ```js
	 * {
	 *   cacheDir: './my-custom-cache-directory'
	 * }
	 * ```
	 */
	cacheDir?: string;

	/**
	 * @docs
	 * @name redirects
	 * @type {Record<string, RedirectConfig>}
	 * @default `{}`
	 * @version 2.9.0
	 * @description Specify a mapping of redirects where the key is the route to match
	 * and the value is the path to redirect to.
	 *
	 * You can redirect both static and dynamic routes, but only to the same kind of route.
	 * For example you cannot have a `'/article': '/blog/[...slug]'` redirect.
	 *
	 *
	 * ```js
	 * {
	 *   redirects: {
	 *     '/old': '/new',
	 *     '/blog/[...slug]': '/articles/[...slug]',
	 *   }
	 * }
	 * ```
	 *
	 *
	 * For statically-generated sites with no adapter installed, this will produce a client redirect using a [`<meta http-equiv="refresh">` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#http-equiv) and does not support status codes.
	 *
	 * When using SSR or with a static adapter in `output: static`
	 * mode, status codes are supported.
	 * Astro will serve redirected GET requests with a status of `301`
	 * and use a status of `308` for any other request method.
	 *
	 * You can customize the [redirection status code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#redirection_messages) using an object in the redirect config:
	 *
	 * ```js
	 * {
	 *   redirects: {
	 *     '/other': {
	 *       status: 302,
	 *       destination: '/place',
	 *     },
	 *   }
	 * }
	 * ```
	 */
	redirects?: Record<string, RedirectConfig>;

	/**
	 * @docs
	 * @name site
	 * @type {string}
	 * @description
	 * Your final, deployed URL. Astro uses this full URL to generate your sitemap and canonical URLs in your final build. It is strongly recommended that you set this configuration to get the most out of Astro.
	 *
	 * ```js
	 * {
	 *   site: 'https://www.my-site.dev'
	 * }
	 * ```
	 */
	site?: string;

	/**
	 * @docs
	 * @name compressHTML
	 * @type {boolean}
	 * @default `false`
	 * @description
	 * This is an option to minify your HTML output and reduce the size of your HTML files. When enabled, Astro removes all whitespace from your HTML, including line breaks, from `.astro` components. This occurs both in development mode and in the final build.
	 * To enable this, set the `compressHTML` flag to `true`.
	 *
	 * ```js
	 * {
	 *   compressHTML: true
	 * }
	 * ```
	 */
	compressHTML?: boolean;

	/**
	 * @docs
	 * @name base
	 * @type {string}
	 * @description
	 * The base path to deploy to. Astro will use this path as the root for your pages and assets both in development and in production build.
	 *
	 * In the example below, `astro dev` will start your server at `/docs`.
	 *
	 * ```js
	 * {
	 *   base: '/docs'
	 * }
	 * ```
	 *
	 * When using this option, all of your static asset imports and URLs should add the base as a prefix. You can access this value via `import.meta.env.BASE_URL`.
	 *
	 * By default, the value of `import.meta.env.BASE_URL` includes a trailing slash. If you have the [`trailingSlash`](https://docs.astro.build/en/reference/configuration-reference/#trailingslash) option set to `'never'`, you will need to add it manually in your static asset imports and URLs.
	 *
	 * ```astro
	 * <a href="/docs/about/">About</a>
	 * <img src=`${import.meta.env.BASE_URL}image.png`>
	 * ```
	 */
	base?: string;

	/**
	 * @docs
	 * @name trailingSlash
	 * @type {('always' | 'never' | 'ignore')}
	 * @default `'ignore'`
	 * @see build.format
	 * @description
	 *
	 * Set the route matching behavior of the dev server. Choose from the following options:
	 *   - `'always'` - Only match URLs that include a trailing slash (ex: "/foo/")
	 *   - `'never'` - Never match URLs that include a trailing slash (ex: "/foo")
	 *   - `'ignore'` - Match URLs regardless of whether a trailing "/" exists
	 *
	 * Use this configuration option if your production host has strict handling of how trailing slashes work or do not work.
	 *
	 * You can also set this if you prefer to be more strict yourself, so that URLs with or without trailing slashes won't work during development.
	 *
	 * ```js
	 * {
	 *   // Example: Require a trailing slash during development
	 *   trailingSlash: 'always'
	 * }
	 * ```
	 */
	trailingSlash?: 'always' | 'never' | 'ignore';

	/**
	 * @docs
	 * @name scopedStyleStrategy
	 * @type {('where' | 'class')}
	 * @default `'where'`
	 * @version 2.4
	 * @description
	 *
	 * Specify the strategy used for scoping styles within Astro components. Choose from:
	 *   - `'where'` - Use `:where` selectors, causing no specifity increase.
	 *   - `'class'` - Use class-based selectors, causing a +1 specifity increase.
	 *
	 * Using `'class'` is helpful when you want to ensure that element selectors within an Astro component override global style defaults (e.g. from a global stylesheet).
	 * Using `'where'` gives you more control over specifity, but requires that you use higher-specifity selectors, layers, and other tools to control which selectors are applied.
	 */
	scopedStyleStrategy?: 'where' | 'class';

	/**
	 * @docs
	 * @name adapter
	 * @typeraw {AstroIntegration}
	 * @see output
	 * @description
	 *
	 * Deploy to your favorite server, serverless, or edge host with build adapters. Import one of our first-party adapters for [Netlify](https://docs.astro.build/en/guides/deploy/netlify/#adapter-for-ssredge), [Vercel](https://docs.astro.build/en/guides/deploy/vercel/#adapter-for-ssr), and more to engage Astro SSR.
	 *
	 * [See our Server-side Rendering guide](https://docs.astro.build/en/guides/server-side-rendering/) for more on SSR, and [our deployment guides](https://docs.astro.build/en/guides/deploy/) for a complete list of hosts.
	 *
	 * ```js
	 * import netlify from '@astrojs/netlify/functions';
	 * {
	 *   // Example: Build for Netlify serverless deployment
	 * 	 adapter: netlify(),
	 * }
	 * ```
	 */
	adapter?: AstroIntegration;

	/**
	 * @docs
	 * @name output
	 * @type {('static' | 'server' | 'hybrid')}
	 * @default `'static'`
	 * @see adapter
	 * @description
	 *
	 * Specifies the output target for builds.
	 *
	 * - 'static' - Building a static site to be deploy to any static host.
	 * - 'server' - Building an app to be deployed to a host supporting SSR (server-side rendering).
	 * - 'hybrid' - Building a static site with a few server-side rendered pages.
	 *
	 * ```js
	 * import { defineConfig } from 'astro/config';
	 *
	 * export default defineConfig({
	 *   output: 'static'
	 * })
	 * ```
	 */
	output?: 'static' | 'server' | 'hybrid';

	/**
	 * @docs
	 * @kind heading
	 * @name Build Options
	 */
	build?: {
		/**
		 * @docs
		 * @name build.format
		 * @typeraw {('file' | 'directory')}
		 * @default `'directory'`
		 * @description
		 * Control the output file format of each page.
		 *   - If 'file', Astro will generate an HTML file (ex: "/foo.html") for each page.
		 *   - If 'directory', Astro will generate a directory with a nested `index.html` file (ex: "/foo/index.html") for each page.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     // Example: Generate `page.html` instead of `page/index.html` during build.
		 *     format: 'file'
		 *   }
		 * }
		 * ```
		 *
		 * #### Effect on Astro.url
		 * Setting `build.format` controls what `Astro.url` is set to during the build. When it is:
		 * - `directory` - The `Astro.url.pathname` will include a trailing slash to mimic folder behavior; ie `/foo/`.
		 * - `file` - The `Astro.url.pathname` will include `.html`; ie `/foo.html`.
		 *
		 * This means that when you create relative URLs using `new URL('./relative', Astro.url)`, you will get consistent behavior between dev and build.
		 */
		format?: 'file' | 'directory';
		/**
		 * @docs
		 * @name build.client
		 * @type {string}
		 * @default `'./dist/client'`
		 * @description
		 * Controls the output directory of your client-side CSS and JavaScript when `output: 'server'` or `output: 'hybrid'` only.
		 * `outDir` controls where the code is built to.
		 *
		 * This value is relative to the `outDir`.
		 *
		 * ```js
		 * {
		 *   output: 'server', // or 'hybrid'
		 *   build: {
		 *     client: './client'
		 *   }
		 * }
		 * ```
		 */
		client?: string;
		/**
		 * @docs
		 * @name build.server
		 * @type {string}
		 * @default `'./dist/server'`
		 * @description
		 * Controls the output directory of server JavaScript when building to SSR.
		 *
		 * This value is relative to the `outDir`.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     server: './server'
		 *   }
		 * }
		 * ```
		 */
		server?: string;
		/**
		 * @docs
		 * @name build.assets
		 * @type {string}
		 * @default `'_astro'`
		 * @see outDir
		 * @version 2.0.0
		 * @description
		 * Specifies the directory in the build output where Astro-generated assets (bundled JS and CSS for example) should live.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assets: '_custom'
		 *   }
		 * }
		 * ```
		 */
		assets?: string;
		/**
		 * @docs
		 * @name build.assetsPrefix
		 * @type {string}
		 * @default `undefined`
		 * @version 2.2.0
		 * @description
		 * Specifies the prefix for Astro-generated asset links. This can be used if assets are served from a different domain than the current site.
		 *
		 * For example, if this is set to `https://cdn.example.com`, assets will be fetched from `https://cdn.example.com/_astro/...` (regardless of the `base` option).
		 * You would need to upload the files in `./dist/_astro/` to `https://cdn.example.com/_astro/` to serve the assets.
		 * The process varies depending on how the third-party domain is hosted.
		 * To rename the `_astro` path, specify a new directory in `build.assets`.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     assetsPrefix: 'https://cdn.example.com'
		 *   }
		 * }
		 * ```
		 */
		assetsPrefix?: string;
		/**
		 * @docs
		 * @name build.serverEntry
		 * @type {string}
		 * @default `'entry.mjs'`
		 * @description
		 * Specifies the file name of the server entrypoint when building to SSR.
		 * This entrypoint is usually dependent on which host you are deploying to and
		 * will be set by your adapter for you.
		 *
		 * Note that it is recommended that this file ends with `.mjs` so that the runtime
		 * detects that the file is a JavaScript module.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     serverEntry: 'main.mjs'
		 *   }
		 * }
		 * ```
		 */
		serverEntry?: string;
		/**
		 * @docs
		 * @name build.redirects
		 * @type {boolean}
		 * @default `true`
		 * @version 2.6.0
		 * @description
		 * Specifies whether redirects will be output to HTML during the build.
		 * This option only applies to `output: 'static'` mode; in SSR redirects
		 * are treated the same as all responses.
		 *
		 * This option is mostly meant to be used by adapters that have special
		 * configuration files for redirects and do not need/want HTML based redirects.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     redirects: false
		 *   }
		 * }
		 * ```
		 */
		redirects?: boolean;
		/**
		 * @docs
		 * @name build.inlineStylesheets
		 * @type {('always' | 'auto' | 'never')}
		 * @default `never`
		 * @version 2.6.0
		 * @description
		 * Control whether styles are sent to the browser in a separate css file or inlined into `<style>` tags. Choose from the following options:
		 *  - `'always'` - all styles are inlined into `<style>` tags
		 *  - `'auto'` - only stylesheets smaller than `ViteConfig.build.assetsInlineLimit` (default: 4kb) are inlined. Otherwise, styles are sent in external stylesheets.
		 *  - `'never'` - all styles are sent in external stylesheets
		 *
		 * ```js
		 * {
		 * 	build: {
		 *		inlineStylesheets: `auto`,
		 * 	},
		 * }
		 * ```
		 */
		inlineStylesheets?: 'always' | 'auto' | 'never';

		/**
		 * @docs
		 * @name build.split
		 * @type {boolean}
		 * @default `false`
		 * @version 2.7.0
		 * @description
		 * Defines how the SSR code should be bundled when built.
		 *
		 * When `split` is `true`, Astro will emit a file for each page.
		 * Each file emitted will render only one page. The pages will be emitted
		 * inside a `dist/pages/` directory, and the emitted files will keep the same file paths
		 * of the `src/pages` directory.
		 *
		 * ```js
		 * {
		 *   build: {
		 *     split: true
		 *   }
		 * }
		 * ```
		 */
		split?: boolean;

		/**
		 * @docs
		 * @name build.excludeMiddleware
		 * @type {boolean}
		 * @default `false`
		 * @version 2.8.0
		 * @description
		 * Defines whether or not any SSR middleware code will be bundled when built.
		 *
		 * When enabled, middleware code is not bundled and imported by all pages during the build. To instead execute and import middleware code manually, set `build.excludeMiddleware: true`:
		 *
		 * ```js
		 * {
		 *   build: {
		 *     excludeMiddleware: true
		 *   }
		 * }
		 * ```
		 */
		excludeMiddleware?: boolean;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Server Options
	 * @description
	 *
	 * Customize the Astro dev server, used by both `astro dev` and `astro preview`.
	 *
	 * ```js
	 * {
	 *   server: { port: 1234, host: true}
	 * }
	 * ```
	 *
	 * To set different configuration based on the command run ("dev", "preview") a function can also be passed to this configuration option.
	 *
	 * ```js
	 * {
	 *   // Example: Use the function syntax to customize based on command
	 *   server: ({ command }) => ({ port: command === 'dev' ? 3000 : 4000 })
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.host
	 * @type {string | boolean}
	 * @default `false`
	 * @version 0.24.0
	 * @description
	 * Set which network IP addresses the server should listen on (i.e. non-localhost IPs).
	 * - `false` - do not expose on a network IP address
	 * - `true` - listen on all addresses, including LAN and public addresses
	 * - `[custom-address]` - expose on a network IP address at `[custom-address]` (ex: `192.168.0.1`)
	 */

	/**
	 * @docs
	 * @name server.port
	 * @type {number}
	 * @default `3000`
	 * @description
	 * Set which port the server should listen on.
	 *
	 * If the given port is already in use, Astro will automatically try the next available port.
	 *
	 * ```js
	 * {
	 *   server: { port: 8080 }
	 * }
	 * ```
	 */

	/**
	 * @name server.open
	 * @type {boolean}
	 * @default `false`
	 * @version 2.1.8
	 * @description
	 * Control whether the dev server should open in your browser window on startup.
	 *
	 * ```js
	 * {
	 *   server: { open: true }
	 * }
	 * ```
	 */

	/**
	 * @docs
	 * @name server.headers
	 * @typeraw {OutgoingHttpHeaders}
	 * @default `{}`
	 * @version 1.7.0
	 * @description
	 * Set custom HTTP response headers to be sent in `astro dev` and `astro preview`.
	 */

	server?: ServerConfig | ((options: { command: 'dev' | 'preview' }) => ServerConfig);

	/**
	 * @docs
	 * @kind heading
	 * @name Image options
	 */
	image?: {
		/**
		 * @docs
		 * @name image.service (Experimental)
		 * @type {{entrypoint: 'astro/assets/services/sharp' | 'astro/assets/services/squoosh' | string, config: Record<string, any>}}
		 * @default `{entrypoint: 'astro/assets/services/squoosh', config?: {}}`
		 * @version 2.1.0
		 * @description
		 * Set which image service is used for Astro’s experimental assets support.
		 *
		 * The value should be an object with an entrypoint for the image service to use and optionally, a config object to pass to the service.
		 *
		 * The service entrypoint can be either one of the included services, or a third-party package.
		 *
		 * ```js
		 * {
		 *   image: {
		 *     // Example: Enable the Sharp-based image service
		 *     service: { entrypoint: 'astro/assets/services/sharp' },
		 *   },
		 * }
		 * ```
		 */
		service: ImageServiceConfig;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Markdown Options
	 */
	markdown?: {
		/**
		 * @docs
		 * @name markdown.drafts
		 * @type {boolean}
		 * @default `false`
		 * @description
		 * Control whether Markdown draft pages should be included in the build.
		 *
		 * A Markdown page is considered a draft if it includes `draft: true` in its frontmatter. Draft pages are always included & visible during development (`astro dev`) but by default they will not be included in your final build.
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Include all drafts in your final build
		 *     drafts: true,
		 *   }
		 * }
		 * ```
		 */
		drafts?: boolean;

		/**
		 * @docs
		 * @name markdown.shikiConfig
		 * @typeraw {Partial<ShikiConfig>}
		 * @description
		 * Shiki configuration options. See [the Markdown configuration docs](https://docs.astro.build/en/guides/markdown-content/#shiki-configuration) for usage.
		 */
		shikiConfig?: Partial<ShikiConfig>;

		/**
		 * @docs
		 * @name markdown.syntaxHighlight
		 * @type {'shiki' | 'prism' | false}
		 * @default `shiki`
		 * @description
		 * Which syntax highlighter to use, if any.
		 * - `shiki` - use the [Shiki](https://github.com/shikijs/shiki) highlighter
		 * - `prism` - use the [Prism](https://prismjs.com/) highlighter
		 * - `false` - do not apply syntax highlighting.
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Switch to use prism for syntax highlighting in Markdown
		 *     syntaxHighlight: 'prism',
		 *   }
		 * }
		 * ```
		 */
		syntaxHighlight?: 'shiki' | 'prism' | false;

		/**
		 * @docs
		 * @name markdown.remarkPlugins
		 * @type {RemarkPlugins}
		 * @description
		 * Pass [remark plugins](https://github.com/remarkjs/remark) to customize how your Markdown is built. You can import and apply the plugin function (recommended), or pass the plugin name as a string.
		 *
		 * ```js
		 * import remarkToc from 'remark-toc';
		 * {
		 *   markdown: {
		 *     remarkPlugins: [remarkToc]
		 *   }
		 * }
		 * ```
		 */
		remarkPlugins?: RemarkPlugins;
		/**
		 * @docs
		 * @name markdown.rehypePlugins
		 * @type {RehypePlugins}
		 * @description
		 * Pass [rehype plugins](https://github.com/remarkjs/remark-rehype) to customize how your Markdown's output HTML is processed. You can import and apply the plugin function (recommended), or pass the plugin name as a string.
		 *
		 * ```js
		 * import rehypeMinifyHtml from 'rehype-minify';
		 * {
		 *   markdown: {
		 *     rehypePlugins: [rehypeMinifyHtml]
		 *   }
		 * }
		 * ```
		 */
		rehypePlugins?: RehypePlugins;
		/**
		 * @docs
		 * @name markdown.gfm
		 * @type {boolean}
		 * @default `true`
		 * @version 2.0.0
		 * @description
		 * Astro uses [GitHub-flavored Markdown](https://github.com/remarkjs/remark-gfm) by default. To disable this, set the `gfm` flag to `false`:
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     gfm: false,
		 *   }
		 * }
		 * ```
		 */
		gfm?: boolean;
		/**
		 * @docs
		 * @name markdown.smartypants
		 * @type {boolean}
		 * @default `true`
		 * @version 2.0.0
		 * @description
		 * Astro uses the [SmartyPants formatter](https://daringfireball.net/projects/smartypants/) by default. To disable this, set the `smartypants` flag to `false`:
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     smartypants: false,
		 *   }
		 * }
		 * ```
		 */
		smartypants?: boolean;
		/**
		 * @docs
		 * @name markdown.remarkRehype
		 * @type {RemarkRehype}
		 * @description
		 * Pass options to [remark-rehype](https://github.com/remarkjs/remark-rehype#api).
		 *
		 * ```js
		 * {
		 *   markdown: {
		 *     // Example: Translate the footnotes text to another language, here are the default English values
		 *     remarkRehype: { footnoteLabel: "Footnotes", footnoteBackLabel: "Back to content"},
		 *   },
		 * };
		 * ```
		 */
		remarkRehype?: RemarkRehype;
	};

	/**
	 * @docs
	 * @kind heading
	 * @name Integrations
	 * @description
	 *
	 * Extend Astro with custom integrations. Integrations are your one-stop-shop for adding framework support (like Solid.js), new features (like sitemaps), and new libraries (like Partytown and Turbolinks).
	 *
	 * Read our [Integrations Guide](https://docs.astro.build/en/guides/integrations-guide/) for help getting started with Astro Integrations.
	 *
	 * ```js
	 * import react from '@astrojs/react';
	 * import tailwind from '@astrojs/tailwind';
	 * {
	 *   // Example: Add React + Tailwind support to Astro
	 *   integrations: [react(), tailwind()]
	 * }
	 * ```
	 */
	integrations?: Array<
		AstroIntegration | (AstroIntegration | false | undefined | null)[] | false | undefined | null
	>;

	/**
	 * @docs
	 * @kind heading
	 * @name Vite
	 * @description
	 *
	 * Pass additional configuration options to Vite. Useful when Astro doesn't support some advanced configuration that you may need.
	 *
	 * View the full `vite` configuration object documentation on [vitejs.dev](https://vitejs.dev/config/).
	 *
	 * #### Examples
	 *
	 * ```js
	 * {
	 *   vite: {
	 *     ssr: {
	 *       // Example: Force a broken package to skip SSR processing, if needed
	 *       external: ['broken-npm-package'],
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * ```js
	 * {
	 *   vite: {
	 *     // Example: Add custom vite plugins directly to your Astro project
	 *     plugins: [myPlugin()],
	 *   }
	 * }
	 * ```
	 */
	vite?: ViteUserConfig;

	/**
	 * @docs
	 * @kind heading
	 * @name Legacy Flags
	 * @description
	 * To help some users migrate between versions of Astro, we occasionally introduce `legacy` flags.
	 * These flags allow you to opt in to some deprecated or otherwise outdated behavior of Astro
	 * in the latest version, so that you can continue to upgrade and take advantage of new Astro releases.
	 */
	legacy?: object;

	/**
	 * @docs
	 * @kind heading
	 * @name Experimental Flags
	 * @description
	 * Astro offers experimental flags to give users early access to new features.
	 * These flags are not guaranteed to be stable.
	 */
	experimental?: {
		/**
		 * @docs
		 * @name experimental.assets
		 * @type {boolean}
		 * @default `false`
		 * @version 2.1.0
		 * @description
		 * Enable experimental support for optimizing and resizing images. With this enabled, a new `astro:assets` module will be exposed.
		 *
		 * To enable this feature, set `experimental.assets` to `true` in your Astro config:
		 *
		 * ```js
		 * {
		 * 	experimental: {
		 *		assets: true,
		 * 	},
		 * }
		 * ```
		 */
		assets?: boolean;

		/**
		 * @docs
		 * @name experimental.viewTransitions
		 * @type {boolean}
		 * @default `false`
		 * @version 2.9.0
		 * @description
		 * Enable experimental support for the `<ViewTransitions / >` component. With this enabled
		 * you can opt-in to [view transitions](https://docs.astro.build/en/guides/view-transitions/) on a per-page basis using this component
		 * and enable animations with the `transition:animate` directive.
		 *
		 * ```js
		 * {
		 * 	experimental: {
		 *		viewTransitions: true,
		 * 	},
		 * }
		 * ```
		 */
		viewTransitions?: boolean;
	};

	// Legacy options to be removed

	/** @deprecated - Use "integrations" instead. Run Astro to learn more about migrating. */
	renderers?: never;
	/** @deprecated `projectRoot` has been renamed to `root` */
	projectRoot?: never;
	/** @deprecated `src` has been renamed to `srcDir` */
	src?: never;
	/** @deprecated `pages` has been removed. It is no longer configurable. */
	pages?: never;
	/** @deprecated `public` has been renamed to `publicDir` */
	public?: never;
	/** @deprecated `dist` has been renamed to `outDir` */
	dist?: never;
	/** @deprecated `styleOptions` has been renamed to `style` */
	styleOptions?: never;
	/** @deprecated `markdownOptions` has been renamed to `markdown` */
	markdownOptions?: never;
	/** @deprecated `buildOptions` has been renamed to `build` */
	buildOptions?: never;
	/** @deprecated `devOptions` has been renamed to `server` */
	devOptions?: never;
}

// NOTE(fks): We choose to keep our hand-generated AstroUserConfig interface so that
// we can add JSDoc-style documentation and link to the definition file in our repo.
// However, Zod comes with the ability to auto-generate AstroConfig from the schema
// above. If we ever get to the point where we no longer need the dedicated
// @types/config.ts file, consider replacing it with the following lines:
//
// export interface AstroUserConfig extends z.input<typeof AstroConfigSchema> {
// }

/**
 * IDs for different stages of JS script injection:
 * - "before-hydration": Imported client-side, before the hydration script runs. Processed & resolved by Vite.
 * - "head-inline": Injected into a script tag in the `<head>` of every page. Not processed or resolved by Vite.
 * - "page": Injected into the JavaScript bundle of every page. Processed & resolved by Vite.
 * - "page-ssr": Injected into the frontmatter of every Astro page. Processed & resolved by Vite.
 */
export type InjectedScriptStage = 'before-hydration' | 'head-inline' | 'page' | 'page-ssr';

export interface InjectedRoute {
	pattern: string;
	entryPoint: string;
	prerender?: boolean;
}

export interface ResolvedInjectedRoute extends InjectedRoute {
	resolvedEntryPoint?: URL;
}

/**
 * Resolved Astro Config
 * Config with user settings along with all defaults filled in.
 */
export interface AstroConfig extends z.output<typeof AstroConfigSchema> {
	// Public:
	// This is a more detailed type than zod validation gives us.
	// TypeScript still confirms zod validation matches this type.
	integrations: AstroIntegration[];
}
export interface AstroInlineConfig extends AstroUserConfig, AstroInlineOnlyConfig {}
export interface AstroInlineOnlyConfig {
	configFile?: string | false;
	mode?: RuntimeMode;
	logLevel?: LoggerLevel;
	/**
	 * @internal for testing only
	 */
	logging?: LogOptions;
}

export type ContentEntryModule = {
	id: string;
	collection: string;
	slug: string;
	body: string;
	data: Record<string, unknown>;
	_internal: {
		rawData: string;
		filePath: string;
	};
};

export type DataEntryModule = {
	id: string;
	collection: string;
	data: Record<string, unknown>;
	_internal: {
		rawData: string;
		filePath: string;
	};
};

export interface ContentEntryType {
	extensions: string[];
	getEntryInfo(params: {
		fileUrl: URL;
		contents: string;
	}): GetContentEntryInfoReturnType | Promise<GetContentEntryInfoReturnType>;
	getRenderModule?(
		this: rollup.PluginContext,
		params: {
			contents: string;
			fileUrl: URL;
			viteId: string;
		}
	): rollup.LoadResult | Promise<rollup.LoadResult>;
	contentModuleTypes?: string;
	/**
	 * Handle asset propagation for rendered content to avoid bleed.
	 * Ex. MDX content can import styles and scripts, so `handlePropagation` should be true.
	 * @default true
	 */
	handlePropagation?: boolean;
}

type GetContentEntryInfoReturnType = {
	data: Record<string, unknown>;
	/**
	 * Used for error hints to point to correct line and location
	 * Should be the untouched data as read from the file,
	 * including newlines
	 */
	rawData: string;
	body: string;
	slug: string;
};

export interface DataEntryType {
	extensions: string[];
	getEntryInfo(params: {
		fileUrl: URL;
		contents: string;
	}): GetDataEntryInfoReturnType | Promise<GetDataEntryInfoReturnType>;
}

export type GetDataEntryInfoReturnType = { data: Record<string, unknown>; rawData?: string };

export interface AstroSettings {
	config: AstroConfig;
	adapter: AstroAdapter | undefined;
	injectedRoutes: InjectedRoute[];
	resolvedInjectedRoutes: ResolvedInjectedRoute[];
	pageExtensions: string[];
	contentEntryTypes: ContentEntryType[];
	dataEntryTypes: DataEntryType[];
	renderers: AstroRenderer[];
	scripts: {
		stage: InjectedScriptStage;
		content: string;
	}[];
	/**
	 * Map of directive name (e.g. `load`) to the directive script code
	 */
	clientDirectives: Map<string, string>;
	tsConfig: TsConfigJson | undefined;
	tsConfigPath: string | undefined;
	watchFiles: string[];
	timer: AstroTimer;
}

export type AsyncRendererComponentFn<U> = (
	Component: any,
	props: any,
	slots: Record<string, string>,
	metadata?: AstroComponentMetadata
) => Promise<U>;

/** Generic interface for a component (Astro, Svelte, React, etc.) */
export interface ComponentInstance {
	default: AstroComponentFactory;
	css?: string[];
	prerender?: boolean;
	getStaticPaths?: (options: GetStaticPathsOptions) => GetStaticPathsResult;
}

export interface AstroInstance {
	file: string;
	url: string | undefined;
	default: AstroComponentFactory;
}

export interface MarkdownInstance<T extends Record<string, any>> {
	frontmatter: T;
	/** Absolute file path (e.g. `/home/user/projects/.../file.md`) */
	file: string;
	/** Browser URL for files under `/src/pages` (e.g. `/en/guides/markdown-content`) */
	url: string | undefined;
	/** Component to render content in `.astro` files. Usage: `<Content />` */
	Content: AstroComponentFactory;
	/** raw Markdown file content, excluding layout HTML and YAML frontmatter */
	rawContent(): string;
	/** Markdown file compiled to HTML, excluding layout HTML */
	compiledContent(): string;
	/** List of headings (h1 -> h6) with associated metadata */
	getHeadings(): MarkdownHeading[];
	default: AstroComponentFactory;
}

type MD = MarkdownInstance<Record<string, any>>;

export type MDXInstance<T extends Record<string, any>> = Omit<
	MarkdownInstance<T>,
	'rawContent' | 'compiledContent'
>;

export interface MarkdownLayoutProps<T extends Record<string, any>> {
	frontmatter: {
		file: MarkdownInstance<T>['file'];
		url: MarkdownInstance<T>['url'];
	} & T;
	file: MarkdownInstance<T>['file'];
	url: MarkdownInstance<T>['url'];
	headings: MarkdownHeading[];
	rawContent: MarkdownInstance<T>['rawContent'];
	compiledContent: MarkdownInstance<T>['compiledContent'];
}

export type MDXLayoutProps<T extends Record<string, any>> = Omit<
	MarkdownLayoutProps<T>,
	'rawContent' | 'compiledContent'
>;

export type GetHydrateCallback = () => Promise<() => void | Promise<void>>;

/**
 * getStaticPaths() options
 *
 * [Astro Reference](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
 */ export interface GetStaticPathsOptions {
	paginate: PaginateFunction;
	/**
	 * The RSS helper has been removed from getStaticPaths! Try the new @astrojs/rss package instead.
	 * @see https://docs.astro.build/en/guides/rss/
	 */
	rss(): never;
}

export type GetStaticPathsItem = {
	params: { [K in keyof Params]: Params[K] | number };
	props?: Props;
};
export type GetStaticPathsResult = GetStaticPathsItem[];
export type GetStaticPathsResultKeyed = GetStaticPathsResult & {
	keyed: Map<string, GetStaticPathsItem>;
};

/**
 * Return an array of pages to generate for a [dynamic route](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes). (**SSG Only**)
 *
 * [Astro Reference](https://docs.astro.build/en/reference/api-reference/#getstaticpaths)
 */
export type GetStaticPaths = (
	options: GetStaticPathsOptions
) =>
	| Promise<GetStaticPathsResult | GetStaticPathsResult[]>
	| GetStaticPathsResult
	| GetStaticPathsResult[];

/**
 * Infers the shape of the `params` property returned by `getStaticPaths()`.
 *
 * @example
 * ```ts
 * import type { GetStaticPaths } from 'astro';
 *
 * export const getStaticPaths = (() => {
 *   return results.map((entry) => ({
 *     params: { slug: entry.slug },
 *   }));
 * }) satisfies GetStaticPaths;
 *
 * type Params = InferGetStaticParamsType<typeof getStaticPaths>;
 * //   ^? { slug: string; }
 *
 * const { slug } = Astro.params as Params;
 * ```
 */
export type InferGetStaticParamsType<T> = T extends () => infer R | Promise<infer R>
	? R extends Array<infer U>
		? U extends { params: infer P }
			? P
			: never
		: never
	: never;

/**
 * Infers the shape of the `props` property returned by `getStaticPaths()`.
 *
 * @example
 * ```ts
 * import type { GetStaticPaths } from 'astro';
 *
 * export const getStaticPaths = (() => {
 *   return results.map((entry) => ({
 *     params: { slug: entry.slug },
 *     props: {
 *       propA: true,
 *       propB: 42
 *     },
 *   }));
 * }) satisfies GetStaticPaths;
 *
 * type Props = InferGetStaticPropsType<typeof getStaticPaths>;
 * //   ^? { propA: boolean; propB: number; }
 *
 * const { propA, propB } = Astro.props;
 * ```
 */
export type InferGetStaticPropsType<T> = T extends () => infer R | Promise<infer R>
	? R extends Array<infer U>
		? U extends { props: infer P }
			? P
			: never
		: never
	: never;

export interface HydrateOptions {
	name: string;
	value?: string;
}

export type JSXTransformConfig = Pick<
	babel.TransformOptions,
	'presets' | 'plugins' | 'inputSourceMap'
>;

export type JSXTransformFn = (options: {
	mode: string;
	ssr: boolean;
}) => Promise<JSXTransformConfig>;

export interface ManifestData {
	routes: RouteData[];
}

export interface MarkdownParserResponse extends MarkdownRenderingResult {
	frontmatter: MD['frontmatter'];
}

/**
 * The `content` prop given to a Layout
 *
 * [Astro reference](https://docs.astro.build/en/guides/markdown-content/#markdown-layouts)
 */
export type MarkdownContent<T extends Record<string, any> = Record<string, any>> = T & {
	astro: MarkdownMetadata;
	url: string | undefined;
	file: string;
};

/**
 * paginate() Options
 *
 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#paginate)
 */
export interface PaginateOptions {
	/** the number of items per-page (default: `10`) */
	pageSize?: number;
	/** key: value object of page params (ex: `{ tag: 'javascript' }`) */
	params?: Params;
	/** object of props to forward to `page` result */
	props?: Props;
}

/**
 * Represents a single page of data in a paginated collection
 *
 * [Astro reference](https://docs.astro.build/en/reference/api-reference/#the-pagination-page-prop)
 */
export interface Page<T = any> {
	/** result */
	data: T[];
	/** metadata */
	/** the count of the first item on the page, starting from 0 */
	start: number;
	/** the count of the last item on the page, starting from 0 */
	end: number;
	/** total number of results */
	total: number;
	/** the current page number, starting from 1 */
	currentPage: number;
	/** number of items per page (default: 25) */
	size: number;
	/** number of last page */
	lastPage: number;
	url: {
		/** url of the current page */
		current: string;
		/** url of the previous page (if there is one) */
		prev: string | undefined;
		/** url of the next page (if there is one) */
		next: string | undefined;
	};
}

export type PaginateFunction = (data: any[], args?: PaginateOptions) => GetStaticPathsResult;

export type Params = Record<string, string | undefined>;

export interface AstroAdapter {
	name: string;
	serverEntrypoint?: string;
	previewEntrypoint?: string;
	exports?: string[];
	args?: any;
}

type Body = string;

export type ValidRedirectStatus = 300 | 301 | 302 | 303 | 304 | 307 | 308;

// Shared types between `Astro` global and API context object
interface AstroSharedContext<Props extends Record<string, any> = Record<string, any>> {
	/**
	 * The address (usually IP address) of the user. Used with SSR only.
	 */
	clientAddress: string;
	/**
	 * Utility for getting and setting the values of cookies.
	 */
	cookies: AstroCookies;
	/**
	 * Information about the current request. This is a standard [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) object
	 */
	request: Request;
	/**
	 * A full URL object of the request URL.
	 */
	url: URL;
	/**
	 * Route parameters for this request if this is a dynamic route.
	 */
	params: Params;
	/**
	 * List of props returned for this path by `getStaticPaths` (**Static Only**).
	 */
	props: Props;
	/**
	 * Redirect to another page (**SSR Only**).
	 */
	redirect(path: string, status?: ValidRedirectStatus): Response;

	/**
	 * Object accessed via Astro middleware
	 */
	locals: App.Locals;
}

export interface APIContext<Props extends Record<string, any> = Record<string, any>>
	extends AstroSharedContext<Props> {
	site: URL | undefined;
	generator: string;
	/**
	 * A full URL object of the request URL.
	 * Equivalent to: `new URL(request.url)`
	 */
	url: AstroSharedContext['url'];
	/**
	 * Parameters matching the page’s dynamic route pattern.
	 * In static builds, this will be the `params` generated by `getStaticPaths`.
	 * In SSR builds, this can be any path segments matching the dynamic route pattern.
	 *
	 * Example usage:
	 * ```ts
	 * export function getStaticPaths() {
	 *   return [
	 *     { params: { id: '0' }, props: { name: 'Sarah' } },
	 *     { params: { id: '1' }, props: { name: 'Chris' } },
	 *     { params: { id: '2' }, props: { name: 'Fuzzy' } },
	 *   ];
	 * }
	 *
	 * export async function get({ params }) {
	 *  return {
	 * 	  body: `Hello user ${params.id}!`,
	 *  }
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/reference/api-reference/#contextparams)
	 */
	params: AstroSharedContext['params'];
	/**
	 * List of props passed from `getStaticPaths`. Only available to static builds.
	 *
	 * Example usage:
	 * ```ts
	 * export function getStaticPaths() {
	 *   return [
	 *     { params: { id: '0' }, props: { name: 'Sarah' } },
	 *     { params: { id: '1' }, props: { name: 'Chris' } },
	 *     { params: { id: '2' }, props: { name: 'Fuzzy' } },
	 *   ];
	 * }
	 *
	 * export function get({ props }) {
	 *   return {
	 *     body: `Hello ${props.name}!`,
	 *   }
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/guides/api-reference/#contextprops)
	 */
	props: AstroSharedContext<Props>['props'];
	/**
	 * Redirect to another page. Only available in SSR builds.
	 *
	 * Example usage:
	 * ```ts
	 * // src/pages/secret.ts
	 * export function get({ redirect }) {
	 *   return redirect('/login');
	 * }
	 * ```
	 *
	 * [context reference](https://docs.astro.build/en/guides/api-reference/#contextredirect)
	 */
	redirect: AstroSharedContext['redirect'];

	/**
	 * Object accessed via Astro middleware.
	 *
	 * Example usage:
	 *
	 * ```ts
	 * // src/middleware.ts
	 * import {defineMiddleware} from "astro/middleware";
	 *
	 * export const onRequest = defineMiddleware((context, next) => {
	 *   context.locals.greeting = "Hello!";
	 *   return next();
	 * });
	 * ```
	 * Inside a `.astro` file:
	 * ```astro
	 * ---
	 * // src/pages/index.astro
	 * const greeting = Astro.locals.greeting;
	 * ---
	 * <h1>{greeting}</h1>
	 * ```
	 */
	locals: App.Locals;
}

export interface EndpointOutput {
	body: Body;
	encoding?: BufferEncoding;
}

export type APIRoute<Props extends Record<string, any> = Record<string, any>> = (
	context: APIContext<Props>
) => EndpointOutput | Response | Promise<EndpointOutput | Response>;

export interface EndpointHandler {
	[method: string]: APIRoute | ((params: Params, request: Request) => EndpointOutput | Response);
}

export type Props = Record<string, unknown>;

export interface AstroRenderer {
	/** Name of the renderer. */
	name: string;
	/** Import entrypoint for the client/browser renderer. */
	clientEntrypoint?: string;
	/** Import entrypoint for the server/build/ssr renderer. */
	serverEntrypoint: string;
	/** JSX identifier (e.g. 'react' or 'solid-js') */
	jsxImportSource?: string;
	/** Babel transform options */
	jsxTransformOptions?: JSXTransformFn;
}

export interface SSRLoadedRenderer extends AstroRenderer {
	ssr: {
		check: AsyncRendererComponentFn<boolean>;
		renderToStaticMarkup: AsyncRendererComponentFn<{
			html: string;
			attrs?: Record<string, string>;
		}>;
		supportsAstroStaticSlot?: boolean;
	};
}

export type HookParameters<
	Hook extends keyof AstroIntegration['hooks'],
	Fn = AstroIntegration['hooks'][Hook]
> = Fn extends (...args: any) => any ? Parameters<Fn>[0] : never;

export interface AstroIntegration {
	/** The name of the integration. */
	name: string;
	/** The different hooks available to extend. */
	hooks: {
		'astro:config:setup'?: (options: {
			config: AstroConfig;
			command: 'dev' | 'build' | 'preview';
			isRestart: boolean;
			updateConfig: (newConfig: Record<string, any>) => void;
			addRenderer: (renderer: AstroRenderer) => void;
			addWatchFile: (path: URL | string) => void;
			injectScript: (stage: InjectedScriptStage, content: string) => void;
			injectRoute: (injectRoute: InjectedRoute) => void;
			addClientDirective: (directive: ClientDirectiveConfig) => void;
			// TODO: Add support for `injectElement()` for full HTML element injection, not just scripts.
			// This may require some refactoring of `scripts`, `styles`, and `links` into something
			// more generalized. Consider the SSR use-case as well.
			// injectElement: (stage: vite.HtmlTagDescriptor, element: string) => void;
		}) => void | Promise<void>;
		'astro:config:done'?: (options: {
			config: AstroConfig;
			setAdapter: (adapter: AstroAdapter) => void;
		}) => void | Promise<void>;
		'astro:server:setup'?: (options: { server: vite.ViteDevServer }) => void | Promise<void>;
		'astro:server:start'?: (options: { address: AddressInfo }) => void | Promise<void>;
		'astro:server:done'?: () => void | Promise<void>;
		'astro:build:ssr'?: (options: {
			manifest: SerializedSSRManifest;
			/**
			 * This maps a {@link RouteData} to an {@link URL}, this URL represents
			 * the physical file you should import.
			 */
			entryPoints: Map<RouteData, URL>;
			/**
			 * File path of the emitted middleware
			 */
			middlewareEntryPoint: URL | undefined;
		}) => void | Promise<void>;
		'astro:build:start'?: () => void | Promise<void>;
		'astro:build:setup'?: (options: {
			vite: vite.InlineConfig;
			pages: Map<string, PageBuildData>;
			target: 'client' | 'server';
			updateConfig: (newConfig: vite.InlineConfig) => void;
		}) => void | Promise<void>;
		'astro:build:generated'?: (options: { dir: URL }) => void | Promise<void>;
		'astro:build:done'?: (options: {
			pages: { pathname: string }[];
			dir: URL;
			routes: RouteData[];
		}) => void | Promise<void>;
	};
}

export type MiddlewareNext<R> = () => Promise<R>;
export type MiddlewareHandler<R> = (
	context: APIContext,
	next: MiddlewareNext<R>
) => Promise<R> | R | Promise<void> | void;

export type MiddlewareResponseHandler = MiddlewareHandler<Response>;
export type MiddlewareEndpointHandler = MiddlewareHandler<Response | EndpointOutput>;
export type MiddlewareNextResponse = MiddlewareNext<Response>;

// NOTE: when updating this file with other functions,
// remember to update `plugin-page.ts` too, to add that function as a no-op function.
export type AstroMiddlewareInstance<R> = {
	onRequest?: MiddlewareHandler<R>;
};

export interface AstroPluginOptions {
	settings: AstroSettings;
	logging: LogOptions;
}

export type RouteType = 'page' | 'endpoint' | 'redirect';

export interface RoutePart {
	content: string;
	dynamic: boolean;
	spread: boolean;
}

type RedirectConfig =
	| string
	| {
			status: ValidRedirectStatus;
			destination: string;
	  };

export interface RouteData {
	route: string;
	component: string;
	generate: (data?: any) => string;
	params: string[];
	pathname?: string;
	// expose the real path name on SSG
	distURL?: URL;
	pattern: RegExp;
	segments: RoutePart[][];
	type: RouteType;
	prerender: boolean;
	redirect?: RedirectConfig;
	redirectRoute?: RouteData;
}

export type RedirectRouteData = RouteData & {
	redirect: string;
};

export type SerializedRouteData = Omit<RouteData, 'generate' | 'pattern' | 'redirectRoute'> & {
	generate: undefined;
	pattern: string;
	redirectRoute: SerializedRouteData | undefined;
	_meta: {
		trailingSlash: AstroConfig['trailingSlash'];
	};
};

export type RuntimeMode = 'development' | 'production';

export type SSRError = Error & vite.ErrorPayload['err'];

export interface SSRElement {
	props: Record<string, any>;
	children: string;
}

/**
 * A hint on whether the Astro runtime needs to wait on a component to render head
 * content. The meanings:
 *
 * - __none__ (default) The component does not propagation head content.
 * - __self__ The component appends head content.
 * - __in-tree__ Another component within this component's dependency tree appends head content.
 *
 * These are used within the runtime to know whether or not a component should be waited on.
 */
export type PropagationHint = 'none' | 'self' | 'in-tree';

export type SSRComponentMetadata = {
	propagation: PropagationHint;
	containsHead: boolean;
};

export interface SSRResult {
	styles: Set<SSRElement>;
	scripts: Set<SSRElement>;
	links: Set<SSRElement>;
	componentMetadata: Map<string, SSRComponentMetadata>;
	createAstro(
		Astro: AstroGlobalPartial,
		props: Record<string, any>,
		slots: Record<string, any> | null
	): AstroGlobal;
	resolve: (s: string) => Promise<string>;
	response: ResponseInit;
	renderers: SSRLoadedRenderer[];
	/**
	 * Map of directive name (e.g. `load`) to the directive script code
	 */
	clientDirectives: Map<string, string>;
	compressHTML: boolean;
	/**
	 * Only used for logging
	 */
	pathname: string;
	cookies: AstroCookies | undefined;
	_metadata: SSRMetadata;
}

/**
 * Ephemeral and mutable state during rendering that doesn't rely
 * on external configuration
 */
export interface SSRMetadata {
	hasHydrationScript: boolean;
	hasDirectives: Set<string>;
	hasRenderedHead: boolean;
	headInTree: boolean;
	extraHead: string[];
	propagators: Map<AstroComponentFactory, AstroComponentInstance>;
}

/* Preview server stuff */
export interface PreviewServer {
	host?: string;
	port: number;
	closed(): Promise<void>;
	stop(): Promise<void>;
}

export interface PreviewServerParams {
	outDir: URL;
	client: URL;
	serverEntrypoint: URL;
	host: string | undefined;
	port: number;
	base: string;
}

export type CreatePreviewServer = (
	params: PreviewServerParams
) => PreviewServer | Promise<PreviewServer>;

export interface PreviewModule {
	default: CreatePreviewServer;
}

/* Client Directives */
type DirectiveHydrate = () => Promise<void>;
type DirectiveLoad = () => Promise<DirectiveHydrate>;

type DirectiveOptions = {
	/**
	 * The component displayName
	 */
	name: string;
	/**
	 * The attribute value provided
	 */
	value: string;
};

export type ClientDirective = (
	load: DirectiveLoad,
	options: DirectiveOptions,
	el: HTMLElement
) => void;

export interface ClientDirectiveConfig {
	name: string;
	entrypoint: string;
}
