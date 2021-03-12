import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class MetatagService {
    readonly property: string = 'property=\"';

    constructor(private meta: Meta) { }

    /**
     * @description Adds new metatags if they don't exist, updates existing metatags,
     * and removes existing metatags if their replacement has empty content. Also checks
     * for initial metatags, and adds them if necessary.
     * @param {MetaDefinition[]} tags The list of tags to be updated.
     * @returns {void}
     */
    public updateTags(tags: MetaDefinition[]): void {
        this.setInitTags();
        this.genericTagUpdate(tags);
    }

    /**
     * @description Removes metatags associated with images.
     * @returns {void}
     */
    private removeImageTags(): void {
        this.meta.removeTag(this.property + 'og:image:width\"');
        this.meta.removeTag(this.property + 'og:image:height\"');
        this.meta.removeTag(this.property + 'og:image:alt\"');
        this.meta.removeTag('name=\"twitter:image:alt\"');
    }

    /**
     * @description If necessary, sets the initial tags for the page.
     * @returns {void}
     */
    private setInitTags(): void {
        const initTags: MetaDefinition[] = [
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@kbeelman' },
            { name: 'twitter:creator', content: '@kbeelman' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { property: 'og:type', content: 'website' }
        ];
        this.genericTagUpdate(initTags);
    }

    /**
     * @description Adds new metatags if they don't exist, updates existing metatags,
     * and removes existing metatags if their replacement has empty content.
     * @param {MetaDefinition[]} tags The list of tags to be updated.
     */
    private genericTagUpdate(tags: MetaDefinition[]): void {
        tags.forEach(tag => {
            // Check if a tag property already exists.
            if (this.meta.getTag(this.property + tag.property + '\"')) {
                // If we're providing new tag content, update the existing tag.
                if (tag.content) {
                    this.meta.updateTag(tag, this.property + tag.property + '\"');
                // If we're not providing new tag content, remove the existing tag.
                } else {
                    this.meta.removeTag(this.property + tag.property + '\"');
                    if (tag.property === 'og:image') {
                        this.removeImageTags();
                    }
                }
            // Check if a tag name already exists
            } else if (this.meta.getTag('name=\"' + tag.name + '\"')) {
                // If we're providing new tag content, update the existing tag.
                if (tag.content) {
                    this.meta.updateTag(tag, 'name=\"' + tag.name + '\"');
                // If we're not providing new tag content, remove the existing tag.
                } else {
                    this.meta.removeTag('name=\"' + tag.name + '\"');
                }
            // Add the tag if it doesn't exist
            } else {
                if (tag.content) {
                    this.meta.addTag(tag);
                }
            }
        });
    }
}
