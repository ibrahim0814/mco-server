// mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { PatchServer } from "./patchServer";

describe("PatchServer", () => {
  const patchServer = new PatchServer();

  test("castanetResponse", () => {
    expect(patchServer.castanetResponse.body.toString("hex")).toEqual(
      "cafebeef00000000000003"
    );
  });

  test("patchUpdateInfo()", () => {
    expect(patchServer._patchUpdateInfo().body.toString("hex")).toEqual(
      "cafebeef00000000000003"
    );
  });

  test("patchNPS()", () => {
    expect(patchServer._patchNPS().body.toString("hex")).toEqual(
      "cafebeef00000000000003"
    );
  });

  test("patchMCO()", () => {
    expect(patchServer._patchMCO().body.toString("hex")).toEqual(
      "cafebeef00000000000003"
    );
  });

  test("generateShardList()", () => {
    expect(patchServer._generateShardList()).toEqual(
      expect.stringContaining("The Clocktower")
    );
  });

  test("getBans()", () => {
    expect(patchServer._getBans()).toEqual([]);
  });
});
