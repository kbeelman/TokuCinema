import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetatagService {

    constructor(private meta: Meta) { }

    public updateTags(tags: MetaDefinition[]): void {
        tags.forEach(tag => {
            if (this.meta.getTag('property=\"' + tag.property + '\"')) {
                this.meta.updateTag(tag, 'property=\"' + tag.property + '\"');
            } else if (this.meta.getTag('name=\"' + tag.name + '\"')) {
                this.meta.updateTag(tag, 'name=\"' + tag.name + '\"');
            } else {
                this.meta.addTag(tag);
            }
        });
    }
}
