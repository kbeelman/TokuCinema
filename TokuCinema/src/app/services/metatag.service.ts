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
                if (tag.content) {
                    this.meta.updateTag(tag, 'property=\"' + tag.property + '\"');
                } else {
                    this.meta.removeTag('property=\"' + tag.property + '\"');
                    if (tag.property === 'og:image') {
                        this.meta.removeTag('property=\"og:image:width\"');
                        this.meta.removeTag('property=\"og:image:height\"');
                    }
                }
            } else if (this.meta.getTag('name=\"' + tag.name + '\"')) {
                if (tag.content) {
                    this.meta.updateTag(tag, 'name=\"' + tag.name + '\"');
                } else {
                    this.meta.removeTag('name=\"' + tag.name + '\"');
                }
            } else {
                if (tag.content) {
                    this.meta.addTag(tag);
                }
            }
        });
    }
}
