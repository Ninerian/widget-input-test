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

import React from "react";
import ReactDOM from "react-dom";

import { BlockElement, BlockFactory, BlockDefinition, ExternalBlockDefinition } from "widget-sdk";
import { GrodaTestProps, GrodaTest } from "./groda-test";
import { configurationSchema } from "./configuration-schema";
import { author, version } from '../package.json'

const factory: BlockFactory = ({
  HTMLElement,
}: typeof window = window): Function => {
  /**
   *  <groda-test message="world!"></groda-test>
   */
  return class GrodaTestBlock extends HTMLElement
    implements BlockElement {
    public constructor() {
      super();
    }

    private get props(): GrodaTestProps {
      return {
        message: this.getAttribute("message") || "",
        list: this.getAttribute("list") || "",
        select: this.getAttribute("select") || "",
      };
    }

    public connectedCallback(): void {
      this.reactRender();
    }

    private reactRender(): void {
      ReactDOM.render(<GrodaTest {...this.props} />, this);
    }

    public static get observedAttributes(): string[] {
      return ["message", "list", "select"];
    }

    public attributeChangedCallback(): void {
      this.reactRender();
    }

    public adoptedCallback(): void {
      // noop
    }

    public disconnectedCallback(): void {
      ReactDOM.unmountComponentAtNode(this);
    }

    public unmount(): void {
      ReactDOM.unmountComponentAtNode(this);
      this.classList.remove('mceNonEditable');
      this.classList.remove('connected');
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
