import React, { ReactElement, useState } from "react";

import { IconBtn } from "../../../lib/icon-btn/icon-btn";
import { ArchiveItemControls } from "../archive-item-controls/archive-item-controls";
import { useAuthN } from "../../../hooks/use-authn";
import { Icon } from "../../../lib/icon/icon";
import { ProtectedComponent } from "../../../lib/protected-component/protected-component";

import "./archive-item.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title: string;
  likeCount: number;
  listenerPeakCount: number;
  date: string;
  isBookmarked?: boolean;

  permissions?: {
    broadcast: string;
  };
}

export function ArchiveItem(props: Props): ReactElement {
  const { className = "", isBookmarked = false } = props;

  const { user } = useAuthN();
  const permissions = user?.permissions;

  //

  const [isControlsOpened, setIsControlsOpened] = useState(false);

  function toggleControls() {
    setIsControlsOpened((prev) => !prev);
  }

  return (
    <li className={`archive-item ${className}`}>
      <span className="archive-item__meta1">
        <span className="archive-item__date">{props.date}</span>
        {/*<IconBtn
          iconName={props.isBookmarked ? "bookmark-selected" : "bookmark"}
          handleBtnClick={() => {}}
          className="archive-item__bookmark"
        />*/}
      </span>
      <header className="archive-item__header">
        <a href="https://www.mixcloud.com/andreygornarchive/">
          <h3
            className="archive-item__heading"
            contentEditable={
              permissions &&
              permissions["broadcast"]?.includes("update_partially")
            }
            suppressContentEditableWarning={true}
          >
            {props.title}
          </h3>
        </a>
      </header>

      <span className="archive-item__meta2">
        <span className="archive-item__listeners">
          Max Listeners:{" "}
          <span className="archive-item__count">{props.listenerPeakCount}</span>
        </span>
        <span className="archive-item__hearts">
          Likes: <span className="archive-item__count">{props.likeCount}</span>
        </span>
      </span>
      <span className="archive-item__controls">
        {/*<IconBtn iconName="tracklist" handleBtnClick={() => {}} />*/}
        <ProtectedComponent resource="broadcast" action="update_partially">
          <IconBtn iconName="pencil" handleBtnClick={toggleControls} />
        </ProtectedComponent>
      </span>
      {isControlsOpened && <ArchiveItemControls />}
    </li>
  );
}