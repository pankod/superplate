import colors, { Color } from "chalk";
import { Ora } from "ora";
import { SetRequired } from "type-fest";

declare type ColorType = typeof Color;

interface Options {
    logLevel?: number;
    mock?: boolean;
}
declare class Logger {
    options: Required<Options>;
    lines: string[];
    constructor(options?: Options);
    setOptions(options: Options): void;
    log(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    success(...args: any[]): void;
    tip(...args: any[]): void;
    info(...args: any[]): void;
    status(color: ColorType, label: string, ...args: any[]): void;
    fileAction(color: ColorType, type: string, fp: string): void;
    fileMoveAction(from: string, to: string): void;
}

/**
 * The state of current running prompt
 */
interface PromptState {
    /**
     * Prompt answers
     */
    answers: {
        [k: string]: any;
    };
}
interface BasePromptOptions {
    /**
     * Used as the key for the answer on the returned values (answers) object.
     */
    name: string;
    /**
     * The message to display when the prompt is rendered in the terminal.
     */
    message: string;
    /** Skip the prompt when returns `true` */
    skip?: (state: PromptState, value: any) => boolean;
    /**
     * 	Function to validate the submitted value before it's returned.
     *  This function may return a boolean or a string.
     *  If a string is returned it will be used as the validation error message.
     */
    validate?: (value: string, state: PromptState) => boolean | string;
    /**
     * Function to format the final submitted value before it's returned.
     */
    result?: (value: string, state: PromptState) => any;
    /**
     * Function to format user input in the terminal.
     */
    format?: (value: string, state: PromptState) => Promise<string> | string;
    /**
     * Store the prompt answer in order to reuse it as default value the next time
     * Defaults to `false`
     */
    store?: boolean;
}
declare type WithPromptState<T> = T | ((state: PromptState) => T);
interface Choice {
    name: string;
    message?: string;
    value?: string;
    hint?: string;
    disabled?: boolean | string;
}
interface ArrayPromptOptions extends BasePromptOptions {
    type:
        | "autocomplete"
        | "editable"
        | "form"
        | "multiselect"
        | "select"
        | "survey"
        | "list"
        | "scale";
    choices: WithPromptState<string[] | Choice[]>;
    /** Maxium number of options to select */
    maxChoices?: number;
    /** Allow to select multiple options */
    muliple?: boolean;
    /** Default value for the prompt */
    default?: WithPromptState<string>;
    delay?: number;
    separator?: boolean;
    sort?: boolean;
    linebreak?: boolean;
    edgeLength?: number;
    align?: "left" | "right";
    /** Make the options scrollable via arrow keys */
    scroll?: boolean;
}
interface BooleanPromptOptions extends BasePromptOptions {
    type: "confirm";
    /** Default value for the prompt */
    default?: WithPromptState<boolean>;
}
interface StringPromptOptions extends BasePromptOptions {
    type: "input" | "invisible" | "list" | "password" | "text";
    /** Default value for the prompt */
    default?: WithPromptState<string>;
    /** Allow the input to be multiple lines */
    multiline?: boolean;
}
declare type PromptOptions =
    | ArrayPromptOptions
    | BooleanPromptOptions
    | StringPromptOptions;

interface AddAction {
    type: "add";
    templateDir?: string;
    files: string[] | string;
    filters?: {
        [k: string]: string | boolean | null | undefined;
    };
    /** Transform the template with ejs */
    transform?: boolean;
    /**
     * Only transform files matching given minimatch patterns
     */
    transformInclude?: string[];
    /**
     * Don't transform files matching given minimatch patterns
     */
    transformExclude?: string;
    /**
     * Custom data to use in template transformation
     */
    data?: DataFunction | object;
}
declare type DataFunction = (this: SAO, context: SAO) => object;
interface MoveAction {
    type: "move";
    templateDir?: string;
    patterns: {
        [k: string]: string;
    };
}
interface ModifyAction {
    type: "modify";
    files: string | string[];
    handler: (data: any, filepath: string) => any;
}
interface RemoveAction {
    type: "remove";
    files:
        | string
        | string[]
        | {
              [k: string]: string | boolean;
          };
    when: boolean | string;
}
declare type Action = AddAction | MoveAction | ModifyAction | RemoveAction;
interface GeneratorConfig {
    /**
     * Generator description
     * Used in CLI output
     */
    description?: string;
    /**
     * Check updates for npm generators
     * Defaults to `true`
     */
    updateCheck?: boolean;
    /**
     * Transform template content with `ejs`
     * Defaults to `true`
     */
    transform?: boolean;
    /**
     * Extra data to use in template transformation
     */
    data?: DataFunction;
    /**
     * Use prompts to ask questions before generating project
     */
    prompts?:
        | PromptOptions[]
        | ((this: SAO, ctx: SAO) => PromptOptions[] | Promise<PromptOptions[]>);
    /**
     * Use actions to control how files are generated
     */
    actions?:
        | Action[]
        | ((this: SAO, ctx: SAO) => Action[] | Promise<Action[]>);
    /**
     * Directory to template folder
     * Defaults to `./template` in your generator folder
     */
    templateDir?: string;
    /**
     * Sub generator
     */
    subGenerators?: Array<{
        name: string;
        generator: string;
    }>;
    /**
     * Run some operations before starting
     */
    prepare?: (this: SAO, ctx: SAO) => Promise<void> | void;
    /**
     * Run some operations when completed
     * e.g. log some success message
     */
    completed?: (this: SAO, ctx: SAO) => Promise<void> | void;
}

declare class SAOError extends Error {
    sao: boolean;
    cmdOutput?: string;
    constructor(message: string);
}
declare function handleError(error: Error | SAOError): void;

interface LocalGenerator {
    type: "local";
    path: string;
    hash: string;
    subGenerator?: string;
}
interface NpmGenerator {
    type: "npm";
    name: string;
    version: string;
    slug: string;
    subGenerator?: string;
    hash: string;
    path: string;
}
interface RepoGenerator {
    type: "repo";
    prefix: GeneratorPrefix;
    user: string;
    repo: string;
    version: string;
    subGenerator?: string;
    hash: string;
    path: string;
}
declare type ParsedGenerator = LocalGenerator | NpmGenerator | RepoGenerator;
declare type GeneratorPrefix = "npm" | "github" | "gitlab" | "bitbucket";

declare class Store {
    data: {
        [k: string]: any;
    };
    constructor();
    read(): {
        [k: string]: any;
    };
    set(key: string, value: any): void;
    get(key: string): any;
}
declare const store: Store;

interface GitUser {
    name: string;
    username: string;
    email: string;
}

declare type NPM_CLIENT = "npm" | "yarn" | "pnpm";
interface InstallOptions {
    cwd: string;
    npmClient?: NPM_CLIENT;
    installArgs?: string[];
    packages?: string[];
    saveDev?: boolean;
    registry?: string;
}

declare type GroupedGenerators = Map<
    string,
    Array<NpmGenerator | RepoGenerator>
>;
declare class GeneratorList {
    store: ParsedGenerator[];
    constructor();
    add(generator: ParsedGenerator): void;
    findGenerators(generator: ParsedGenerator): ParsedGenerator[];
    /**
     * Group generators by name
     */
    get groupedGenerators(): GroupedGenerators;
}
declare const generatorList: GeneratorList;

declare function runCLI(): Promise<void>;

interface IPaths {
    sourcePath: string;
    templateDir: string;
}
interface IExtras {
    apiMode: boolean;
    debug: boolean;
    paths: IPaths;
    projectType: string;
    commitMessage?: string;
    presetAnswers?: Record<string, string | undefined>;
    disableTelemetry?: boolean;
}
interface Options$1 {
    appName?: string;
    extras: IExtras;
    outDir?: string;
    logLevel?: number;
    debug?: boolean;
    quiet?: boolean;
    generator: string;
    /** Update cached generator before running */
    update?: boolean;
    /** Use `git clone` to download repo */
    clone?: boolean;
    /** Use a custom npm registry */
    registry?: string;
    /** Check for sao/generator updates */
    updateCheck?: boolean;
    /** Mock git info, prompts etc */
    mock?: boolean;
    /**
     * User-supplied answers
     * `true` means using default answers for prompts
     */
    answers?:
        | boolean
        | {
              [k: string]: any;
          };
}
declare class SAO {
    opts: SetRequired<Options$1, "outDir" | "logLevel">;
    spinner: Ora;
    colors: colors.Chalk &
        colors.ChalkFunction & {
            supportsColor: false | colors.ColorSupport;
            /**
             * Create an SAO Error so we can pretty print the error message instead of showing full error stack
             */
            Level: colors.Level;
            Color:
                | "black"
                | "red"
                | "green"
                | "yellow"
                | "blue"
                | "magenta"
                | "cyan"
                | "white"
                | "gray"
                | "grey"
                | "blackBright"
                | "redBright"
                | "greenBright"
                | "yellowBright"
                | "blueBright"
                | "magentaBright"
                | "cyanBright"
                | "whiteBright"
                | "bgBlack"
                | "bgRed"
                | "bgGreen"
                | "bgYellow"
                | "bgBlue"
                | "bgMagenta"
                | "bgCyan"
                | "bgWhite"
                | "bgGray"
                | "bgGrey"
                | "bgBlackBright"
                | "bgRedBright"
                | "bgGreenBright"
                | "bgYellowBright"
                | "bgBlueBright"
                | "bgMagentaBright"
                | "bgCyanBright"
                | "bgWhiteBright";
            ForegroundColor:
                | "black"
                | "red"
                | "green"
                | "yellow"
                | "blue"
                | "magenta"
                | "cyan"
                | "white"
                | "gray"
                | "grey"
                | "blackBright"
                | "redBright"
                | "greenBright"
                | "yellowBright"
                | "blueBright"
                | "magentaBright"
                | "cyanBright"
                | "whiteBright";
            BackgroundColor:
                | "bgBlack"
                | "bgRed"
                | "bgGreen"
                | "bgYellow"
                | "bgBlue"
                | "bgMagenta"
                | "bgCyan"
                | "bgWhite"
                | "bgGray"
                | "bgGrey"
                | "bgBlackBright"
                | "bgRedBright"
                | "bgGreenBright"
                | "bgYellowBright"
                | "bgBlueBright"
                | "bgMagentaBright"
                | "bgCyanBright"
                | "bgWhiteBright";
            Modifiers:
                | "reset"
                | "bold"
                | "dim"
                | "italic"
                | "underline"
                | "inverse"
                | "hidden"
                | "strikethrough"
                | "visible";
            stderr: colors.Chalk & {
                supportsColor: false | colors.ColorSupport;
                /**
                 * Get file list of output directory
                 */
            };
        };
    logger: Logger;
    private _answers;
    private _data;
    parsedGenerator: ParsedGenerator;
    generatorList: GeneratorList;
    constructor(opts: Options$1);
    /**
     * Get the help message for current generator
     *
     * Used by SAO CLI, in general you don't want to touch this
     */
    getGeneratorHelp(): Promise<string>;
    /**
     * Get actual generator to run and its config
     * Download it if not yet cached
     */
    getGenerator(
        generator?: ParsedGenerator,
        hasParent?: boolean,
    ): Promise<{
        generator: ParsedGenerator;
        config: GeneratorConfig;
    }>;
    runGenerator(
        generator: ParsedGenerator,
        config: GeneratorConfig,
    ): Promise<void>;
    run(): Promise<void>;
    /**
     * Retrive the answers
     *
     * You can't access this in `prompts` function
     */
    get answers(): {
        [k: string]: any;
    };
    set answers(value: { [k: string]: any });
    get data(): any;
    /**
     * Read package.json from output directory
     *
     * Returns an empty object when it doesn't exist
     */
    get pkg(): any;
    /**
     * Get the information of system git user
     */
    get gitUser(): GitUser;
    /**
     * The basename of output directory
     */
    get outDirName(): string;
    /**
     * The absolute path to output directory
     */
    get outDir(): string;
    /**
     * The npm client
     */
    get npmClient(): NPM_CLIENT;
    /**
     * Run `git init` in output directly
     *
     * It will fail silently when `git` is not available
     */
    gitInit(): void;
    /**
     * Run `npm install` in output directory
     */
    npmInstall(opts?: Omit<InstallOptions, "cwd" | "registry">): Promise<{
        code: number;
    }>;
    /**
     * Display a success message
     */
    showProjectTips(): void;
    /**
     * Create an SAO Error so we can pretty print the error message instead of showing full error stack
     */
    createError(message: string): SAOError;
    /**
     * Get file list of output directory
     */
    getOutputFiles(): Promise<string[]>;
    /**
     * Check if a file exists in output directory
     */
    hasOutputFile(file: string): Promise<boolean>;
    /**
     * Read a file in output directory
     * @param file file path
     */
    readOutputFile(file: string): Promise<string>;
}

export {
    GeneratorConfig,
    Options$1 as Options,
    SAO,
    generatorList,
    handleError,
    runCLI,
    store,
    Action,
};
