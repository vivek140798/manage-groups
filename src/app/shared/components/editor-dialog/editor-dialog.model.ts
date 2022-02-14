export class EditorDialog {
    constructor(public type: string, public title: string, public record: object, public save = 'Save', public cancel = 'Cancel' ) { }
}
