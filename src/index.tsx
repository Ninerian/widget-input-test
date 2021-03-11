/*!
 * Copyright 2020, Staffbase GmbH and contributors.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BlockFactory, BlockDefinition, ExternalBlockDefinition } from "widget-sdk";
import { GrodaTestProps } from "./groda-test";
import { configurationSchema } from "./configuration-schema";
import { author, version } from '../package.json'

const factory: BlockFactory = Base => {
    /**
     *  <groda-test message="world!"></groda-test>
     */
    return class GrodaTestBlock extends Base {

        public constructor() {
            super();
        }

        get props(): GrodaTestProps {
            const defaults = super.props
            return {
                ...defaults,
                message: this.getAttribute("message") || "",
                list: this.getAttribute("list") || "",
                select: this.getAttribute("select") || "",
            };
        }

        public renderBlock(container: HTMLElement): void {
            const div = document.createElement('div')
            const props = this.props;
            div.innerText="Widget Language " + props.contentLanguage;
            container.appendChild(div)
        }

        unmountBlock(container: HTMLElement): void {
            container.innerHTML = '';
        }

        public renderBlockInEditor(container: HTMLElement): void {
            const div = document.createElement('div')
            const props = this.props;
            div.innerText=`Widget Language ` + props.contentLanguage;
            container.appendChild(div)
        }


        public static get observedAttributes(): string[] {
            return ["content-language", "widget-title", "message", "list", "select"];
        }

        public attributeChangedCallback(...args: [string, string | undefined, string | undefined]): void {
            super.attributeChangedCallback.apply(this.constructor, args);
        }
    };
};

const blockDefinition: BlockDefinition = {
    name: "groda-test",
    factory: factory,
    attributes: ['message'],
    blockLevel: 'block',
    configurationSchema: configurationSchema,
};

const externalBlockDefinition: ExternalBlockDefinition = {
    blockDefinition,
    author,
    version
};

window.defineBlock(externalBlockDefinition);
