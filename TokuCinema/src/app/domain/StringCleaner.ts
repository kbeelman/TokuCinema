export enum StringType {
  WithRoute,
  WithoutRoute
}

export class StringCleaner {
    public CleanString: string;

    constructor(stringToClean: string, stringType: StringType) {
        if (stringType === StringType.WithoutRoute) {
            this.CleanString = this.cleanString(stringToClean);
        } else if (stringType === StringType.WithRoute) {
            this.CleanString = this.cleanRouteName(stringToClean);
        } else {
          this.CleanString = '';
        }
    }

    public getCleanString(): string {
        return this.CleanString;
    }

  // Clean if is part of a route - routing
  private cleanRouteName(routeName: string): string {
    if (routeName.split('/')[2]) {
      const cleanName = routeName.split('/')[2]
        .replace(/[^A-Za-z]/, '-')
        .split(' ');

      if (cleanName.length > 1) {
        return this.replaceSpaces(cleanName[0] + '-' + cleanName[cleanName.length - 1]);
      } else {
        return this.replaceSpaces(cleanName[0]);
      }
    } else {
      return '';
    }
  }

  // Clean if not part of a route - assignment
  private cleanString(str: string): string {
    return this.replaceSpaces(str);
  }

  private replaceSpaces(str: string): string {
    return str.replace(/\s+/g, '-');
  }
}
