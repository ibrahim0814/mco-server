// mco-server is a game server, written from scratch, for an old game
// Copyright (C) <2017-2018>  <Joseph W Becher>

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Connection } from "../../../Connection";
import { Logger } from "../logger";

const logger = new Logger().getLogger();

export class ClientConnectMsg {
  public customerId: number;
  public personaId: number;
  public personaName: string;
  public msgNo: number;
  private appId: number;
  private custName: string;
  private mcVersion: Buffer;

  constructor(buffer: Buffer) {
    try {
      this.msgNo = buffer.readInt16LE(0);
    } catch (error) {
      if (error instanceof RangeError) {
        // This is likeley not an MCOTS packet, ignore
        this.msgNo = 0;
      } else {
        throw new Error(
          `[ClientConnectMsg] Unable to read msgNo from ${buffer.toString(
            "hex"
          )}: ${error}`
        );
      }
    }

    this.customerId = buffer.readInt32LE(2);
    this.personaId = buffer.readInt32LE(6);

    // Set the appId to the Persona Id
    this.appId = this.personaId;

    this.customerId = buffer.readInt32LE(2);
    this.custName = buffer.slice(10, 41).toString();
    this.personaName = buffer.slice(42, 73).toString();
    this.mcVersion = buffer.slice(74);
    return this;
  }

  public getAppId() {
    return this.appId;
  }

  /**
   * dumpPacket
   */
  public dumpPacket() {
    logger.info("[ClientConnectMsg]======================================");
    logger.debug("MsgNo:       ", this.msgNo.toString());
    logger.debug("customerId:  ", this.customerId.toString());
    logger.debug("personaId:   ", this.personaId.toString());
    logger.debug("custName:    ", this.custName);
    logger.debug("personaName: ", this.personaName);
    logger.debug("mcVersion:   ", this.mcVersion.toString("hex"));
    logger.info("[ClientConnectMsg]======================================");
  }
}

module.exports = { ClientConnectMsg };
