export class StringCleaner {
    public CleanString: string;

    constructor(stringToClean: string, stringType: StringType) {
        if (stringType === StringType.WithoutRoute) {
            this.CleanString = this.cleanString(stringToClean.replace(/\s+/g, '-'));
        } else if (stringType === StringType.WithRoute) {
            this.CleanString = this.cleanRouteName(stringToClean.replace(/\s+/g, '-'));
        }
    }

    public getCleanString(): string {
        return this.CleanString;
    }

  // Clean if is part of a route - routing
  private cleanRouteName(routeName: string): string {
    let cleanName = routeName.split('/')[2]
      .replace(/[^A-Za-z]/, "-")
      .split(' ');

    if(cleanName.length > 1){
      return this.replaceSpaces(cleanName[0] + '-' + cleanName[cleanName.length-1]);
    }
    else {
      return this.replaceSpaces(cleanName[0]);
    }
  }

  // Clean if not part of a route - assignment
  private cleanString(string: string): string {
      let cleanString = string.replace(/[^A-Za-z]/, "-")
      .split(' ');
    if(cleanString.length > 1){
      return this.replaceSpaces(cleanString[0] + '-' + cleanString[cleanString.length-1]);
    }
    else {
      return this.replaceSpaces(cleanString[0]);
    }
  }

  private replaceSpaces(string: string): string {
    return string.replace(/\s+/g, '-');
  }
}


export enum StringType {
    WithRoute,
    WithoutRoute
}