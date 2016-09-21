with import <nixpkgs> {}; {
  faderEditorEnv = stdenv.mkDerivation {
    name = "faderEditor";
    buildInputs = [ stdenv nodejs-5_x ];
  };
}

