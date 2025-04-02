const A="data:image/png;base64,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";export{A as default};
