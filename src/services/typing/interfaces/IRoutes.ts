import { Component } from "vue";

export interface IRoutes {
    path: string;
    component: () => Promise<Component>;
}